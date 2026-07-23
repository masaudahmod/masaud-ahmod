export type BlogStatus = 'published' | 'draft'

export interface BlogPost {
  id: string
  title: string
  status: BlogStatus
  categories: string[]
  readTime: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Mastering WebGL Shaders in React',
    status: 'draft',
    categories: ['Graphics', 'React'],
    readTime: '8 min',
  },
  {
    id: '2',
    title: 'Architecting Scalable Design Systems',
    status: 'published',
    categories: ['UX/UI', 'CSS'],
    readTime: '12 min',
  },
  {
    id: '3',
    title: 'Building Real-time Apps with WebSockets',
    status: 'published',
    categories: ['Backend', 'Node.js'],
    readTime: '10 min',
  },
  {
    id: '4',
    title: 'TypeScript Advanced Patterns',
    status: 'published',
    categories: ['TypeScript'],
    readTime: '15 min',
  },
  {
    id: '5',
    title: 'Optimizing Next.js Performance',
    status: 'draft',
    categories: ['Next.js', 'Performance'],
    readTime: '9 min',
  },
  {
    id: '6',
    title: 'Introduction to Server Components',
    status: 'published',
    categories: ['React', 'Next.js'],
    readTime: '7 min',
  },
]

export const draftPreview = {
  title: 'Mastering WebGL Shaders in React',
  excerpt:
    'WebGL shaders unlock incredible visual possibilities in the browser. In this guide, we explore how to integrate custom fragment and vertex shaders into a React application using react-three-fiber.',
  section: 'The Fragment Shader',
  code: `const fragmentShader = \`
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    vec2 st = vUv;
    float wave = sin(st.x * 10.0 + uTime) * 0.5 + 0.5;
    gl_FragColor = vec4(0.2, 0.4, wave, 1.0);
  }
\`;`,
}

export const blogStats = {
  totalReads: '124.5K',
  readsTrend: '+12% this month',
  avgTime: '4m 12s',
  avgTimeSubtext: 'Across all published',
}
