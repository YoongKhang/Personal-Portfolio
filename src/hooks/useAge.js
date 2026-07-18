import { useEffect, useState } from 'react'

// Date of birth (local time). Edit here to change the person.
const BIRTHDAY = new Date('2006-12-04T00:00:00')

// Leap-year-aware breakdown: years / months / days + current clock time.
// Far more accurate than the old `ms / (365.25 days)` approximation.
function computeAge(birth, now) {
  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  let days = now.getDate() - birth.getDate()

  if (days < 0) {
    months -= 1
    // days in the previous month
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  return {
    years,
    months,
    days,
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  }
}

// Returns the age breakdown, re-computed every second.
export function useAge() {
  const [age, setAge] = useState(() => computeAge(BIRTHDAY, new Date()))

  useEffect(() => {
    const id = setInterval(() => {
      setAge(computeAge(BIRTHDAY, new Date()))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return age
}
