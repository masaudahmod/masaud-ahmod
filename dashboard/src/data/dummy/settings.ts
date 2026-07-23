export const websiteSettings = {
  general: {
    siteName: 'Masaud Ahmod Portfolio',
    tagline: 'Full Stack Developer & Open Source Contributor',
    favicon: '/favicon.ico',
    language: 'en',
  },
  profile: {
    name: 'Masaud Ahmod',
    designation: 'Full Stack Developer',
    email: 'hello@masaud.dev',
    phone: '+1 (555) 123-4567',
    location: 'Dhaka, Bangladesh',
    bio: 'Passionate full stack developer building modern web applications with React, Node.js, and cloud technologies.',
  },
  social: {
    github: 'https://github.com/masaud-ahmod',
    linkedin: 'https://linkedin.com/in/masaud-ahmod',
    twitter: 'https://twitter.com/masaud_ahmod',
    devto: 'https://dev.to/masaud',
  },
  contact: {
    formEnabled: true,
    notificationEmail: 'hello@masaud.dev',
    autoReply: true,
  },
  footer: {
    copyright: '© 2026 Masaud Ahmod. All rights reserved.',
    showSocialLinks: true,
    customText: 'Built with Portfolio CMS',
  },
}

export const settingsTabs = ['General', 'Profile', 'Social Links', 'Contact', 'Footer'] as const
