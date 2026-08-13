export interface Certificate {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId: string
  url: string
}

export const certificates: Certificate[] = [
  {
    id: '1',
    title: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services',
    issueDate: 'Mar 2024',
    expiryDate: 'Mar 2027',
    credentialId: 'AWS-DEV-2024-XXXX',
    url: '#',
  },
  {
    id: '2',
    title: 'Meta Front-End Developer Professional',
    issuer: 'Meta / Coursera',
    issueDate: 'Nov 2023',
    credentialId: 'META-FE-2023-XXXX',
    url: '#',
  },
  {
    id: '3',
    title: 'Google Cloud Professional Cloud Developer',
    issuer: 'Google Cloud',
    issueDate: 'Jun 2023',
    expiryDate: 'Jun 2026',
    credentialId: 'GCP-PCD-2023-XXXX',
    url: '#',
  },
  {
    id: '4',
    title: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    issueDate: 'Jan 2023',
    credentialId: 'MDB-DEV-2023-XXXX',
    url: '#',
  },
  {
    id: '5',
    title: 'React Advanced Patterns',
    issuer: 'Frontend Masters',
    issueDate: 'Sep 2022',
    credentialId: 'FM-REACT-2022-XXXX',
    url: '#',
  },
  {
    id: '6',
    title: 'Node.js Application Developer',
    issuer: 'OpenJS Foundation',
    issueDate: 'Apr 2022',
    credentialId: 'OJS-NODE-2022-XXXX',
    url: '#',
  },
]
