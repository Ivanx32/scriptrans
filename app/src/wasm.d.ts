declare module '/wasm/whisper.js' {
  const factory: () => Promise<Record<string, unknown>>;
  export default factory;
}

declare module '/wasm/whisper.single.js' {
  const factory: () => Promise<Record<string, unknown>>;
  export default factory;
}

declare module 'public/wasm/whisper.js' {
  const factory: () => Promise<Record<string, unknown>>;
  export default factory;
}

declare module 'public/wasm/whisper.single.js' {
  const factory: () => Promise<Record<string, unknown>>;
  export default factory;
}
