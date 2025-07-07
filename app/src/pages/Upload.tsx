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
    <div className="flex flex-col items-center gap-4">
      <div
        className={`w-full max-w-md p-8 border-2 border-dashed rounded-lg text-center ${
          drag ? 'bg-blue-50' : 'bg-gray-50'
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
        <p className="text-sm text-gray-500">Drag and drop audio file here</p>
        {file && <p className="mt-2 text-green-600">{file.name}</p>}
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={() => navigate('/progress')}
        disabled={!file}
      >
        Start
      </button>
    </div>
  );
}
