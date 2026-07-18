// Single source of truth for portfolio content.

export const profile = {
  name: 'Chin Yoong Khang',
  subtitle: 'Software Engineering Student & Web Developer',
  intro:
    'Currently Year 1 Software Engineer in Sunway University, passionate about creating innovative web solutions and software applications. I love turning complex problems into simple, beautiful, and intuitive designs.',
  photo: '/images/yoongkhang.jpg',
  email: 'chinyoongkhang@gmail.com',
  phone: '+60 18-966 3689',
  location: 'Sunway University, Malaysia',
}

// Age is rendered live by the useAge hook, not from this list.
export const stats = [
  { label: 'Nationality', value: 'Malaysian' },
  { label: 'Age', value: 'live' },
  { label: 'Gender', value: 'Male' },
  { label: 'Current Education', value: 'Sunway University' },
]

export const skillGroups = [
  { title: 'Programming', items: ['CSS', 'HTML', 'Java', 'JavaScript', 'Python', 'SQL'] },
  { title: 'Tools', items: ['Eclipse', 'Visual Studio Code', 'PyCharm'] },
  { title: 'Languages', items: ['Chinese', 'English', 'Malay'] },
]

export const projects = [
  {
    title: 'Inventory Management System',
    description:
      'A Python-Based Inventory Management System that allow user to manage their items such as quantity and price.',
    image: '/images/project1.png',
    repo: 'https://github.com/YoongKhang/PYTHON-BASED-E-COMMERCE-INVENTORY-MANAGEMENT-SYSTEM.git',
    demo: 'https://www.youtube.com/watch?v=Mby0-_QChaw',
  },
  {
    title: 'A Clothing Website',
    description:
      'A Modern and Responsive Clothing Website that allow user to browse and purchase clothing items.',
    image: '/images/project2.png',
    repo: 'https://github.com/YoongKhang/Sakura-Clothing-Site',
    demo: 'https://youtu.be/zJqWPIsw0kM?si=RmiWMJpNV2FIA_Pg',
  },
]

export const socials = [
  { name: 'TikTok', iconClass: 'bx bxl-tiktok', url: 'https://v.douyin.com/3EitaILW3AU/', color: '#000000' },
  { name: 'Instagram', iconClass: 'bx bxl-instagram', url: 'https://www.instagram.com/pr0bably_yk/', color: '#E1306C' },
  { name: 'LinkedIn', iconClass: 'bx bxl-linkedin', url: 'https://www.linkedin.com/in/chin-yoong-khang-743350334/', color: '#0A66C2' },
  { name: 'Discord', iconClass: 'bx bxl-discord-alt', url: 'https://discord.com/users/669877357066190848', color: '#5865F2' },
  { name: 'WhatsApp', iconClass: 'bx bxl-whatsapp', url: 'https://wa.me/60189663689', color: '#25D366' },
  { name: 'WeChat', iconClass: 'fa-brands fa-weixin', url: 'mailto:chinyoongkhang@gmail.com', color: '#09B83E' },
  { name: 'GitHub', iconClass: 'bx bxl-github', url: 'https://github.com/YoongKhang', color: '#ffffff' },
  { name: 'Gmail', iconClass: 'bx bxl-gmail', url: 'mailto:chinyoongkhang@gmail.com', color: '#EA4335' },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]
