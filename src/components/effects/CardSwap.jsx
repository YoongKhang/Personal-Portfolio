import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});
const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  auto = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const swapRef = useRef(null);
  const promoteRef = useRef(null);
  const hovered = useRef(new Set());
  const restPos = useRef([]);
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      const slot = makeSlot(i, cardDistance, verticalDistance, total);
      restPos.current[i] = slot;
      placeNow(r.current, slot, skewAmount);
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        restPos.current[idx] = slot;
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      restPos.current[front] = backSlot;
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    // Expose swap so a card click can advance the stack manually.
    swapRef.current = swap;

    // Bring the card at stack-position k straight to the front.
    const promoteToFront = (k) => {
      if (order.current.length < 2 || k <= 0) return;
      const total = refs.length;
      const arr = order.current;
      const clicked = arr[k];
      order.current = [clicked, ...arr.slice(0, k), ...arr.slice(k + 1)];
      order.current.forEach((childIdx, pos) => {
        const el = refs[childIdx].current;
        if (!el) return;
        const slot = makeSlot(pos, cardDistance, verticalDistance, total);
        restPos.current[childIdx] = slot;
        const lifted = hovered.current.has(childIdx);
        gsap.set(el, { zIndex: slot.zIndex });
        gsap.to(el, {
          x: slot.x,
          y: slot.y - (lifted ? 30 : 0),
          z: slot.z,
          scale: lifted ? 1.04 : 1,
          duration: config.durMove,
          ease: config.ease
        });
      });
    };
    promoteRef.current = promoteToFront;

    if (auto) {
      swap();
      intervalRef.current = window.setInterval(swap, delay);
    }

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, cardDistance, verticalDistance, delay, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onMouseEnter: () => {
            // Lift the hovered card to a fixed offset above its resting slot.
            hovered.current.add(i);
            const el = refs[i].current;
            const rest = restPos.current[i] ?? { y: 0 };
            gsap.to(el, { y: rest.y - 30, scale: 1.04, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
          },
          onMouseLeave: () => {
            // Return it to its exact resting slot (absolute, so no drift).
            hovered.current.delete(i);
            const el = refs[i].current;
            const rest = restPos.current[i] ?? { y: 0 };
            gsap.to(el, { y: rest.y, scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
          },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
            // Bring the clicked card straight to the front.
            const k = order.current.indexOf(i);
            promoteRef.current?.(k);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
