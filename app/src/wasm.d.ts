declare module '/wasm/whisper.js' {
  const factory: () => Promise<any>;
  export default factory;
}

declare module 'public/wasm/whisper.js' {
  const factory: () => Promise<any>;
  export default factory;
}
