export interface Skill {
  id: string
  name: string
  category: string
  level: number
  years: number
}

export const skillCategories = ['All', 'Frontend', 'Backend', 'DevOps', 'Tools']

export const skills: Skill[] = [
  { id: '1', name: 'React / Next.js', category: 'Frontend', level: 95, years: 4 },
  { id: '2', name: 'TypeScript', category: 'Frontend', level: 90, years: 3 },
  { id: '3', name: 'Tailwind CSS', category: 'Frontend', level: 92, years: 3 },
  { id: '4', name: 'Node.js', category: 'Backend', level: 88, years: 4 },
  { id: '5', name: 'Express / Fastify', category: 'Backend', level: 85, years: 3 },
  { id: '6', name: 'PostgreSQL', category: 'Backend', level: 80, years: 3 },
  { id: '7', name: 'Prisma ORM', category: 'Backend', level: 82, years: 2 },
  { id: '8', name: 'Docker', category: 'DevOps', level: 75, years: 2 },
  { id: '9', name: 'AWS / Vercel', category: 'DevOps', level: 78, years: 2 },
  { id: '10', name: 'Git / GitHub', category: 'Tools', level: 95, years: 5 },
  { id: '11', name: 'Figma', category: 'Tools', level: 70, years: 2 },
  { id: '12', name: 'GraphQL', category: 'Backend', level: 72, years: 2 },
]
