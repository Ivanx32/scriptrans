export async function loadModel(Module: any, url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch model: ${res.status}`);
  const buf = await res.arrayBuffer();
  Module.FS_writeFile('/tiny.bin', new Uint8Array(buf));
  console.log('Model ok');
}
