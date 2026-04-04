import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Societies from './components/Societies';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OnlineLearning from './components/OnlineLearning';
import Athletics from './components/Athletics';
import HistoryBanner from './components/HistoryBanner';
import CinematicLoader from './components/CinematicLoader';
import NoiseOverlay from './components/NoiseOverlay';

// Page Imports
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const AcademicsPage = lazy(() => import('./pages/AcademicsPage'));
const ClubsPage = lazy(() => import('./pages/ClubsPage'));
const SportsPage = lazy(() => import('./pages/SportsPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LifeAtSchoolPage = lazy(() => import('./pages/LifeAtSchoolPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Admin Imports
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const Dashboard = lazy(() => import('./admin/Dashboard'));
const NewsCMS = lazy(() => import('./admin/NewsCMS'));
const GalleryCMS = lazy(() => import('./admin/GalleryCMS'));
const StaffCMS = lazy(() => import('./admin/StaffCMS'));
const SocietiesCMS = lazy(() => import('./admin/SocietiesCMS'));
const SettingsPage = lazy(() => import('./admin/SettingsPage'));

function LandingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <News />
      <OnlineLearning />
      <Gallery />
      <Athletics />
      <Societies />
      <HistoryBanner />
      <Contact />
      <Footer />
    </main>
  );
}

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <ThemeProvider>
      <ErrorBoundary>
      <NoiseOverlay />
      <Router>
        <CinematicLoader>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-surface-container"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Public Pages */}
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/life-at-school" element={<LifeAtSchoolPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={
              user ? <Navigate to="/admin" replace /> : <AdminLogin onLogin={(u) => setUser(u)} />
            } />

            <Route path="/admin" element={
              <ProtectedRoute isAuthenticated={!!user}>
                <AdminLayout user={user} onLogout={() => setUser(null)} />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="news" element={<NewsCMS />} />
              <Route path="gallery" element={<GalleryCMS />} />
              <Route path="staff" element={<StaffCMS />} />
              <Route path="societies" element={<SocietiesCMS />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        </CinematicLoader>
      </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
