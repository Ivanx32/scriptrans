import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Upload from './pages/Upload';
import Progress from './pages/Progress';
import Editor from './pages/Editor';
import './App.css';
import { FileContext } from './FileContext';

function Header() {
  const location = useLocation();
  const step =
    location.pathname === '/progress'
      ? 'Progress'
      : location.pathname === '/editor'
        ? 'Editor'
        : 'Upload';
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src="/icons/placeholder.svg" alt="logo" className="h-6 w-6" />
        <span className="font-bold">{step}</span>
      </div>
      <nav className="hidden md:block space-x-4">
        <Link to="/upload">Upload</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/editor">Editor</Link>
      </nav>
    </header>
  );
}

export default function App() {
  const [online, setOnline] = useState(navigator.onLine);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <FileContext.Provider value={{ file, setFile }}>
        <Header />
        {!online && (
          <div className="text-yellow-400 text-center p-2">Offline</div>
        )}
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/upload" replace />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
        </main>
      </FileContext.Provider>
    </BrowserRouter>
  );
}
