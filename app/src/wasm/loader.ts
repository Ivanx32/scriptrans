import '../wasm.d.ts';

export const wasmReady = (async () => {
  const url = (typeof crossOriginIsolated !== 'undefined' && !crossOriginIsolated)
    ? '/wasm/whisper.single.js'
    : '/wasm/whisper.js';
  const factory = (await import(/* @vite-ignore */ url)).default as () => Promise<Record<string, unknown>>;
  const mod = await factory();
  console.log('wasm ready');
  return mod;
})();

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
