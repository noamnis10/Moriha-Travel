import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PackageDetail from './pages/PackageDetail';
import AboutPage from './pages/AboutPage';
import ThankYou from './pages/ThankYou';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
