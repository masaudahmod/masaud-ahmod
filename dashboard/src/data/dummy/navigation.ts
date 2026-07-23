import type { ComponentType } from 'react'
import {
  BarChart3,
  BookOpen,
  Briefcase,
  FolderKanban,
  Image,
  LayoutDashboard,
  Mail,
  Search,
  Settings,
  Sparkles,
} from 'lucide-react'
import { GitHubIcon } from '../../components/ui/GitHubIcon'

export interface NavItem {
  label: string
  path: string
  icon: ComponentType<{ className?: string }>
  searchPlaceholder?: string
}

export const mainNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
    searchPlaceholder: 'Search...',
  },
  {
    label: 'Portfolio Projects',
    path: '/projects',
    icon: FolderKanban,
    searchPlaceholder: 'Search resources...',
  },
  {
    label: 'Blog',
    path: '/blog',
    icon: BookOpen,
    searchPlaceholder: 'Search blog posts...',
  },
  {
    label: 'Skills',
    path: '/skills',
    icon: Sparkles,
    searchPlaceholder: 'Search skills...',
  },
  {
    label: 'Experience',
    path: '/experience',
    icon: Briefcase,
    searchPlaceholder: 'Search experience...',
  },
  /* {
    label: 'Education',
    path: '/education',
    icon: GraduationCap,
    searchPlaceholder: 'Search education...',
  }, */
  /* {
    label: 'Certificates',
    path: '/certificates',
    icon: Award,
    searchPlaceholder: 'Search certificates...',
  }, */
  {
    label: 'Media Library',
    path: '/media',
    icon: Image,
    searchPlaceholder: 'Search media...',
  },
  {
    label: 'Messages',
    path: '/messages',
    icon: Mail,
    searchPlaceholder: 'Search messages...',
  },
  {
    label: 'SEO Manager',
    path: '/seo',
    icon: Search,
    searchPlaceholder: 'Search SEO entries...',
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
    searchPlaceholder: 'Search analytics...',
  },
  {
    label: 'GitHub Integration',
    path: '/github',
    icon: GitHubIcon,
    searchPlaceholder: 'Search GitHub settings...',
  },
]

export const footerNavItems: NavItem[] = [
  {
    label: 'Website Settings',
    path: '/settings',
    icon: Settings,
    searchPlaceholder: 'Search settings...',
  },
]

export const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/': {
    title: 'Portfolio CMS Admin',
    subtitle: 'Monitor your portfolio performance and recent activities.',
  },
  '/projects': {
    title: 'Portfolio Projects',
    subtitle: 'Manage, update, and deploy your showcase work.',
  },
  '/blog': {
    title: 'Blog Content',
    subtitle: 'Manage your technical articles, tutorials, and thoughts.',
  },
  '/skills': {
    title: 'Skills',
    subtitle: 'Manage your technical skills and proficiency levels.',
  },
  '/experience': {
    title: 'Experience',
    subtitle: 'Manage your professional work history and roles.',
  },
  '/education': {
    title: 'Education',
    subtitle: 'Manage your academic background and qualifications.',
  },
  '/certificates': {
    title: 'Certificates',
    subtitle: 'Manage your certifications and credentials.',
  },
  '/media': {
    title: 'Media Library',
    subtitle: 'Upload and organize images, videos, and documents.',
  },
  '/messages': {
    title: 'Messages',
    subtitle: 'View and respond to contact form submissions.',
  },
  '/seo': {
    title: 'SEO Manager',
    subtitle: 'Optimize meta tags, sitemaps, and search performance.',
  },
  '/analytics': {
    title: 'Analytics & Performance',
    subtitle: 'Real-time metrics tracking engagement, traffic sources, and GitHub activity.',
  },
  '/github': {
    title: 'GitHub Integration',
    subtitle: 'Connect and sync your GitHub profile and repositories.',
  },
  '/settings': {
    title: 'Website Settings',
    subtitle: 'Configure your portfolio site preferences and content.',
  },
}
