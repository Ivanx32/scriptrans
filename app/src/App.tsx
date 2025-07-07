import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Upload from './pages/Upload';
import Progress from './pages/Progress';
import Editor from './pages/Editor';
import './App.css';

export default function App() {
  const [online, setOnline] = useState(navigator.onLine);

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
    <BrowserRouter>
      <header className="header">
        <nav>
          <Link to="/">Upload</Link> |{' '}
          <Link to="/progress">Progress</Link> |{' '}
          <Link to="/editor">Editor</Link>
        </nav>
        {!online && <span style={{ marginLeft: '1rem', color: 'yellow' }}>Offline</span>}
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
