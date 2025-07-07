import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileContext } from '../FileContext';

export default function Progress() {
  const { file } = useContext(FileContext);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      navigate('/upload', { replace: true });
      return;
    }
    const interval = setInterval(() => {
      setProgress((p) => Math.min(100, p + 10));
    }, 300);
    return () => clearInterval(interval);
  }, [file, navigate]);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => navigate('/editor', { replace: true }), 500);
      return () => clearTimeout(t);
    }
  }, [progress, navigate]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-sm md:max-w-screen-md px-4 flex flex-col items-center gap-4">
        <progress max="100" value={progress} className="w-full sm:w-80" />
        <p className="text-[color:var(--fg)]">Transcribing… {progress} %</p>
      </div>
    </main>
  );
}
