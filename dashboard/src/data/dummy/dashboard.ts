export const dashboardMetrics = [
  { label: 'Total Projects', value: '24', subtext: '+2 this month', icon: 'folder' as const },
  { label: 'Published Blogs', value: '48', subtext: 'Consistent', icon: 'file' as const },
  { label: 'Monthly Views', value: '12.4k', subtext: 'vs last mo', trend: '+15%', trendPositive: true, icon: 'eye' as const },
  { label: 'GitHub Activity', value: '184', subtext: 'Contributions', icon: 'github' as const },
]

export const weeklyViews = [
  { day: 'Mon', views: 2100 },
  { day: 'Tue', views: 2800 },
  { day: 'Wed', views: 3200 },
  { day: 'Thu', views: 2900 },
  { day: 'Fri', views: 3500 },
  { day: 'Sat', views: 4800, highlight: true },
  { day: 'Sun', views: 3100 },
]

export const recentActivity = [
  { time: 'Just now', text: 'Updated Project: AI Chatbot CLI', type: 'update' },
  { time: '2 hours ago', text: 'New Blog Draft Created', type: 'draft' },
  { time: 'Yesterday', text: 'Portfolio Deployment Successful', type: 'success' },
]

export const techStackDistribution = [
  { label: 'React / Next.js', value: 45, color: '#2563eb' },
  { label: 'TypeScript', value: 30, color: '#3b82f6' },
  { label: 'Node.js', value: 15, color: '#22c55e' },
  { label: 'Other (Python, Go)', value: 10, color: '#64748b' },
]

export const inboxPreview = [
  {
    id: '1',
    sender: 'Sarah Jenkins',
    snippet: 'Interested in collaborating on a React project...',
    time: '2h ago',
    unread: true,
  },
  {
    id: '2',
    sender: 'DevRecruiters Inc.',
    snippet: 'We have an opening that matches your profile...',
    time: '5h ago',
    unread: true,
  },
  {
    id: '3',
    sender: 'Tech Conference',
    snippet: 'Speaker invitation for Web Summit 2026...',
    time: '1d ago',
    unread: false,
  },
]
