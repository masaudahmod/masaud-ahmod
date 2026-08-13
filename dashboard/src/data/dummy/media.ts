export type MediaType = 'image' | 'video' | 'document'

export interface MediaItem {
  id: string
  name: string
  type: MediaType
  size: string
  uploadedAt: string
  url: string
}

export const mediaItems: MediaItem[] = [
  { id: '1', name: 'hero-banner.png', type: 'image', size: '245 KB', uploadedAt: '2 days ago', url: '#' },
  { id: '2', name: 'project-screenshot-01.jpg', type: 'image', size: '512 KB', uploadedAt: '3 days ago', url: '#' },
  { id: '3', name: 'profile-avatar.webp', type: 'image', size: '89 KB', uploadedAt: '1 week ago', url: '#' },
  { id: '4', name: 'demo-walkthrough.mp4', type: 'video', size: '12.4 MB', uploadedAt: '1 week ago', url: '#' },
  { id: '5', name: 'resume-2026.pdf', type: 'document', size: '156 KB', uploadedAt: '2 weeks ago', url: '#' },
  { id: '6', name: 'blog-cover-react.jpg', type: 'image', size: '320 KB', uploadedAt: '2 weeks ago', url: '#' },
  { id: '7', name: 'certificate-aws.png', type: 'image', size: '98 KB', uploadedAt: '3 weeks ago', url: '#' },
  { id: '8', name: 'portfolio-pitch-deck.pdf', type: 'document', size: '2.1 MB', uploadedAt: '1 month ago', url: '#' },
  { id: '9', name: 'intro-animation.mp4', type: 'video', size: '8.7 MB', uploadedAt: '1 month ago', url: '#' },
  { id: '10', name: 'logo-dark.svg', type: 'image', size: '12 KB', uploadedAt: '2 months ago', url: '#' },
  { id: '11', name: 'logo-light.svg', type: 'image', size: '11 KB', uploadedAt: '2 months ago', url: '#' },
  { id: '12', name: 'tech-stack-infographic.png', type: 'image', size: '445 KB', uploadedAt: '2 months ago', url: '#' },
]

export const mediaTypeFilters = ['All', 'Image', 'Video', 'Document'] as const
