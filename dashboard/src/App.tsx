import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { ThemeProvider } from './context/ThemeContext'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { BlogPage } from './pages/BlogPage'
// import { CertificatesPage } from './pages/CertificatesPage'
import { DashboardPage } from './pages/DashboardPage'
// import { EducationPage } from './pages/EducationPage'
import { ExperiencePage } from './pages/ExperiencePage'
import { GitHubIntegrationPage } from './pages/GitHubIntegrationPage'
import { MediaLibraryPage } from './pages/MediaLibraryPage'
import { MessagesPage } from './pages/MessagesPage'
import { PortfolioProjectsPage } from './pages/PortfolioProjectsPage'
import { SeoManagerPage } from './pages/SeoManagerPage'
import { SkillsPage } from './pages/SkillsPage'
import { WebsiteSettingsPage } from './pages/WebsiteSettingsPage'
import { LoginPage } from './pages/LoginPage'
import { AuthBootstrap, PublicOnly, RequireAuth } from './components/auth/RouteGuards'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthBootstrap />
        <Routes>
          <Route element={<PublicOnly />}><Route path="login" element={<LoginPage />} /></Route>
          <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="projects" element={<PortfolioProjectsPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            {/* <Route path="education" element={<EducationPage />} /> */}
            {/* <Route path="certificates" element={<CertificatesPage />} /> */}
            <Route path="media" element={<MediaLibraryPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="seo" element={<SeoManagerPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="github" element={<GitHubIntegrationPage />} />
            <Route path="settings" element={<WebsiteSettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
