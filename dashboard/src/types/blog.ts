export type PostStatus = 'DRAFT' | 'REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED'

export type BlogTag = {
  tag: {
    id: string
    name: string
    slug: string
  }
}

export type Blog = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  status: PostStatus
  category?: { id: string; name: string } | null
  content?: { content: string; wordCount: number; readingTime: number } | null
  featuredImage?: { id: string; url: string } | null
  tags: BlogTag[]
  createdAt: string
  updatedAt: string
}

export type CreateBlogPayload = {
  title: string
  excerpt?: string
  categoryId?: string
  status: PostStatus
  tags: string[]
  content: string
  featuredImage?: string
}

export type UpdateBlogPayload = Partial<CreateBlogPayload>
