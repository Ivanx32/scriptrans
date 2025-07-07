import { createContext } from 'react';

export interface FileState {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const FileContext = createContext<FileState>({
  file: null,
  setFile: () => {}
});
