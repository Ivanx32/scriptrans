import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileContext } from '../FileContext';

export default function Upload() {
  const { file, setFile } = useContext(FileContext);
  const [drag, setDrag] = useState(false);
  const navigate = useNavigate();

  const handleFiles = (files: FileList | null) => {
    const f = files && files[0];
    if (f) setFile(f);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-sm md:max-w-screen-md px-4 flex flex-col items-center gap-4">
        <div
          className={`w-full p-8 border-2 border-dashed rounded-lg text-center ${
            drag ? 'bg-blue-50 dark:bg-blue-900' : 'bg-[color:var(--bg)]'
          }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="mb-4"
        />
        <p className="text-sm text-[color:var(--fg)] opacity-70">Drag and drop audio file here</p>
        {file && <p className="mt-2 text-[color:var(--accent)]">{file.name}</p>}
        </div>
        <button
          className="bg-[color:var(--accent)] text-[color:var(--bg)] px-4 py-2 rounded disabled:opacity-50"
          onClick={() => navigate('/progress')}
          disabled={!file}
        >
          Start
        </button>
      </div>
    </main>
  );
}
