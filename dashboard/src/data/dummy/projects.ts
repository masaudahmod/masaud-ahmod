import heroImage from '../../assets/hero.png'

export type ProjectStatus = 'published' | 'draft'

export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  category: string
  tags: { name: string; color: string }[]
  updatedAt: string
  image: string
}

export const projectCategories = ['All Categories', 'Web App', 'Mobile', 'Open Source', 'SaaS']

export const projects: Project[] = [
  {
    id: '1',
    title: 'FinTech Analytics Platform',
    description: 'Real-time financial dashboard with advanced charting and portfolio tracking capabilities.',
    status: 'published',
    category: 'Web App',
    tags: [
      { name: 'React', color: '#06b6d4' },
      { name: 'TypeScript', color: '#8b5cf6' },
      { name: 'Node.js', color: '#22c55e' },
    ],
    updatedAt: '2 days ago',
    image: heroImage,
  },
  {
    id: '2',
    title: 'AI Chatbot CLI',
    description: 'Command-line interface for interacting with multiple LLM providers with streaming support.',
    status: 'published',
    category: 'Open Source',
    tags: [
      { name: 'Python', color: '#eab308' },
      { name: 'OpenAI', color: '#10b981' },
    ],
    updatedAt: '3 days ago',
    image: heroImage,
  },
  {
    id: '3',
    title: 'E-Commerce Mobile App',
    description: 'Cross-platform shopping experience with payment integration and real-time inventory.',
    status: 'draft',
    category: 'Mobile',
    tags: [
      { name: 'React Native', color: '#06b6d4' },
      { name: 'Firebase', color: '#f97316' },
    ],
    updatedAt: '1 week ago',
    image: heroImage,
  },
  {
    id: '4',
    title: 'Design System Library',
    description: 'Comprehensive component library with accessibility-first design tokens and documentation.',
    status: 'published',
    category: 'Open Source',
    tags: [
      { name: 'React', color: '#06b6d4' },
      { name: 'Storybook', color: '#ec4899' },
    ],
    updatedAt: '1 week ago',
    image: heroImage,
  },
  {
    id: '5',
    title: 'Portfolio CMS',
    description: 'Headless CMS for managing portfolio content with GitHub sync and analytics integration.',
    status: 'published',
    category: 'SaaS',
    tags: [
      { name: 'Next.js', color: '#0f172a' },
      { name: 'Prisma', color: '#6366f1' },
      { name: 'PostgreSQL', color: '#2563eb' },
    ],
    updatedAt: '2 weeks ago',
    image: heroImage,
  },
  {
    id: '6',
    title: 'Task Management SaaS',
    description: 'Collaborative project management tool with kanban boards and team analytics.',
    status: 'draft',
    category: 'SaaS',
    tags: [
      { name: 'Vue.js', color: '#22c55e' },
      { name: 'GraphQL', color: '#ec4899' },
    ],
    updatedAt: '3 weeks ago',
    image: heroImage,
  },
  {
    id: '7',
    title: 'Weather Dashboard',
    description: 'Beautiful weather visualization with 7-day forecasts and location-based alerts.',
    status: 'published',
    category: 'Web App',
    tags: [
      { name: 'React', color: '#06b6d4' },
      { name: 'D3.js', color: '#f97316' },
    ],
    updatedAt: '1 month ago',
    image: heroImage,
  },
  {
    id: '8',
    title: 'API Gateway Service',
    description: 'Microservices gateway with rate limiting, authentication, and request logging.',
    status: 'published',
    category: 'Web App',
    tags: [
      { name: 'Go', color: '#06b6d4' },
      { name: 'Redis', color: '#ef4444' },
    ],
    updatedAt: '1 month ago',
    image: heroImage,
  },
  {
    id: '9',
    title: 'Social Media Scheduler',
    description: 'Schedule and automate posts across multiple social platforms with analytics.',
    status: 'draft',
    category: 'SaaS',
    tags: [
      { name: 'Node.js', color: '#22c55e' },
      { name: 'MongoDB', color: '#10b981' },
    ],
    updatedAt: '2 months ago',
    image: heroImage,
  },
]
