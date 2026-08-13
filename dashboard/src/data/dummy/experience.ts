export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  description: string
  tags: string[]
  current?: boolean
}

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'TechFlow Solutions',
    role: 'Senior Full Stack Developer',
    startDate: 'Jan 2023',
    endDate: 'Present',
    description:
      'Leading development of client-facing SaaS products. Architected microservices infrastructure and mentored junior developers.',
    tags: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
    current: true,
  },
  {
    id: '2',
    company: 'Digital Craft Agency',
    role: 'Full Stack Developer',
    startDate: 'Jun 2021',
    endDate: 'Dec 2022',
    description:
      'Built custom web applications for enterprise clients. Implemented CI/CD pipelines and improved page load times by 40%.',
    tags: ['Next.js', 'TypeScript', 'MongoDB'],
  },
  {
    id: '3',
    company: 'StartupHub Inc.',
    role: 'Frontend Developer',
    startDate: 'Mar 2020',
    endDate: 'May 2021',
    description:
      'Developed responsive UI components and integrated REST APIs. Collaborated with design team on component library.',
    tags: ['React', 'Redux', 'SASS'],
  },
  {
    id: '4',
    company: 'Freelance',
    role: 'Web Developer',
    startDate: 'Jan 2018',
    endDate: 'Feb 2020',
    description:
      'Delivered portfolio websites and e-commerce solutions for small businesses and startups.',
    tags: ['JavaScript', 'WordPress', 'PHP'],
  },
]
