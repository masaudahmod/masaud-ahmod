export interface Education {
  id: string
  title: string
  institution: string
  duration: string
  description?: string
}

export const educations: Education[] = [
  {
    id: '1',
    title: 'Bachelor of Science in Computer Science',
    institution: 'University of Technology',
    duration: '2014 - 2018',
    description: 'Focus on software engineering, algorithms, and web technologies.',
  },
  {
    id: '2',
    title: 'Full Stack Web Development Bootcamp',
    institution: 'Code Academy',
    duration: '2019',
    description: 'Intensive program covering MERN stack, Git, and agile methodologies.',
  },
  {
    id: '3',
    title: 'Advanced React & TypeScript',
    institution: 'Frontend Masters',
    duration: '2021',
    description: 'Advanced patterns, performance optimization, and testing strategies.',
  },
]
