declare module '/wasm/whisper.js' {
  const factory: () => Promise<Record<string, unknown>>;
  export default factory;
}

declare module 'public/wasm/whisper.js' {
  const factory: () => Promise<Record<string, unknown>>;
  export default factory;
}
