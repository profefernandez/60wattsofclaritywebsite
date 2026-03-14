import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import EntryHero from './pages/EntryHero';
import FullWebsite from './pages/FullWebsite';
import SnapshotPage from './pages/SnapshotPage';
import SpotlightCursor from './components/ui/SpotlightCursor';

/**
 * Animated route wrapper — enables Framer Motion page transitions.
 */
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<EntryHero />} />
        <Route path="/home" element={<FullWebsite />} />
        <Route path="/snapshot" element={<SnapshotPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

/**
 * Application router with cinematic page transitions and spotlight cursor.
 *
 * Routes:
 *   /          → EntryHero (landing with A/B choice)
 *   /home      → FullWebsite (all sections)
 *   /snapshot  → SnapshotPage (strategic overview + AI chatbot)
 *   *          → redirect to /
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SpotlightCursor />
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;
