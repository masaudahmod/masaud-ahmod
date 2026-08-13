export interface SeoPage {
  id: string
  path: string
  title: string
  description: string
  score: number
}

export interface Redirect {
  id: string
  from: string
  to: string
  type: string
}

export const siteMeta = {
  title: 'Masaud Ahmod | Full Stack Developer',
  description: 'Portfolio showcasing projects, blog posts, and professional experience in web development.',
  url: 'https://masaud.dev',
}

export const seoPages: SeoPage[] = [
  { id: '1', path: '/', title: 'Home', description: 'Full stack developer portfolio', score: 92 },
  { id: '2', path: '/projects', title: 'Projects', description: 'Showcase of web development projects', score: 88 },
  { id: '3', path: '/blog', title: 'Blog', description: 'Technical articles and tutorials', score: 85 },
  { id: '4', path: '/about', title: 'About', description: 'Professional background and skills', score: 90 },
  { id: '5', path: '/contact', title: 'Contact', description: 'Get in touch for collaborations', score: 78 },
]

export const sitemapStatus = {
  lastGenerated: '2026-07-20',
  totalPages: 24,
  indexed: 22,
  status: 'healthy' as const,
}

export const redirects: Redirect[] = [
  { id: '1', from: '/old-projects', to: '/projects', type: '301' },
  { id: '2', from: '/blog/archive', to: '/blog', type: '301' },
]

export const seoKeywords = [
  { keyword: 'full stack developer portfolio', rank: 3, change: '+2' },
  { keyword: 'react developer', rank: 8, change: '-1' },
  { keyword: 'nextjs portfolio', rank: 5, change: '+4' },
]
