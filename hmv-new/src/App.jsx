import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

// Page Imports
import HistoryPage from './pages/HistoryPage';
import AcademicsPage from './pages/AcademicsPage';
import ClubsPage from './pages/ClubsPage';
import SportsPage from './pages/SportsPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import LifeAtSchoolPage from './pages/LifeAtSchoolPage';

// Admin Imports
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';

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

function App() {
  const [user, setUser] = useState(null);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  };

  return (
    <Router>
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
          <ProtectedRoute>
            <AdminLayout user={user} onLogout={() => setUser(null)} />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="news" element={<div className="text-white text-2xl font-serif">News CMS (Coming Soon)</div>} />
          <Route path="gallery" element={<div className="text-white text-2xl font-serif">Gallery CMS (Coming Soon)</div>} />
          <Route path="staff" element={<div className="text-white text-2xl font-serif">Staff CMS (Coming Soon)</div>} />
          <Route path="societies" element={<div className="text-white text-2xl font-serif">Societies CMS (Coming Soon)</div>} />
          <Route path="settings" element={<div className="text-white text-2xl font-serif">Settings (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
