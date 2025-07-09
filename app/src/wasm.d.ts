declare module '/wasm/whisper-web.js' {
  const factory: () => Promise<Record<string, unknown>>;
  export default factory;
}

declare module '/wasm/whisper-web.single.js' {
  const factory: () => Promise<Record<string, unknown>>;
  export default factory;
}

declare module 'public/wasm/whisper-web.js' {
  const factory: () => Promise<Record<string, unknown>>;
  export default factory;
}

declare module 'public/wasm/whisper-web.single.js' {
  const factory: () => Promise<Record<string, unknown>>;
  export default factory;
}
