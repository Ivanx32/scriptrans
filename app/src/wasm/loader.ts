import '../wasm.d.ts';
// @ts-expect-error -- WASM factory has no TypeScript definitions
import whisper_factory from '/wasm/whisper.js';

export const wasmReady = whisper_factory();

export async function loadModel(
  Module: { FS_writeFile(path: string, data: Uint8Array): void },
  url: string,
) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch model: ${res.status}`);
  const buf = await res.arrayBuffer();
  Module.FS_writeFile('/tiny.bin', new Uint8Array(buf));
  console.log('Model ok');
}
