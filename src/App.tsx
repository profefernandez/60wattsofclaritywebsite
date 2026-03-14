import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EntryHero from './pages/EntryHero';
import FullWebsite from './pages/FullWebsite';
import SnapshotPage from './pages/SnapshotPage';

/**
 * Application router.
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
      <Routes>
        <Route path="/" element={<EntryHero />} />
        <Route path="/home" element={<FullWebsite />} />
        <Route path="/snapshot" element={<SnapshotPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
