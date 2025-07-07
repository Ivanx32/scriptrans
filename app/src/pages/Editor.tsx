import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileContext } from '../FileContext';

export default function Editor() {
  const { file, setFile } = useContext(FileContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      navigate('/upload', { replace: true });
    }
  }, [file, navigate]);

  if (!file) return null;

  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  const copy = () => navigator.clipboard.writeText(text);
  const download = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const back = () => {
    setFile(null);
    navigate('/upload');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-sm md:max-w-screen-md px-4 flex flex-col items-center gap-4">
        <textarea
          className="w-full h-40 border p-2 bg-[color:var(--bg)] text-[color:var(--fg)]"
          defaultValue={text}
        />
        <div className="flex gap-2">
          <button className="bg-[color:var(--accent)] text-[color:var(--bg)] px-3 py-1 rounded" onClick={copy}>
            Copy
          </button>
          <button className="bg-[color:var(--accent)] text-[color:var(--bg)] px-3 py-1 rounded" onClick={download}>
            Download .txt
          </button>
          <button className="bg-[color:var(--accent)] text-[color:var(--bg)] px-3 py-1 rounded" onClick={back}>
            Back to Upload
          </button>
        </div>
      </div>
    </main>
  );
}
