export type MessageStatus = 'new' | 'read' | 'replied' | 'closed'

export interface Message {
  id: string
  sender: string
  email: string
  subject: string
  snippet: string
  body: string
  timestamp: string
  status: MessageStatus
  unread: boolean
}

export const messages: Message[] = [
  {
    id: '1',
    sender: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    subject: 'Collaboration Opportunity',
    snippet: 'Interested in collaborating on a React project...',
    body: 'Hi, I came across your portfolio and was impressed by your React work. We are building a design system and would love to discuss a potential collaboration. Are you available for a quick call this week?',
    timestamp: '2 hours ago',
    status: 'new',
    unread: true,
  },
  {
    id: '2',
    sender: 'DevRecruiters Inc.',
    email: 'hr@devrecruiters.com',
    subject: 'Senior Developer Position',
    snippet: 'We have an opening that matches your profile...',
    body: 'Hello, we are a tech recruitment agency specializing in full-stack roles. We have a senior developer position at a fast-growing startup that aligns with your skills. Would you be interested in learning more?',
    timestamp: '5 hours ago',
    status: 'new',
    unread: true,
  },
  {
    id: '3',
    sender: 'Tech Conference',
    email: 'speakers@techconf.io',
    subject: 'Speaker Invitation - Web Summit 2026',
    snippet: 'Speaker invitation for Web Summit 2026...',
    body: 'We would like to invite you to speak at Web Summit 2026 about building scalable React applications. The event takes place in November. Please let us know if you are interested.',
    timestamp: '1 day ago',
    status: 'read',
    unread: false,
  },
  {
    id: '4',
    sender: 'John Martinez',
    email: 'john.m@startup.io',
    subject: 'Freelance Project Inquiry',
    snippet: 'Looking for a developer for a 3-month contract...',
    body: 'Hi there, our startup needs help building an MVP using Next.js and Node.js. The project is estimated at 3 months. Could we schedule a call to discuss scope and rates?',
    timestamp: '2 days ago',
    status: 'replied',
    unread: false,
  },
  {
    id: '5',
    sender: 'Open Source Foundation',
    email: 'community@osf.org',
    subject: 'Contribution Recognition',
    snippet: 'Thank you for your recent contributions...',
    body: 'We wanted to recognize your recent contributions to our open source project. Your pull requests have been merged and the community appreciates your work.',
    timestamp: '3 days ago',
    status: 'closed',
    unread: false,
  },
]
