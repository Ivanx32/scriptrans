// Placeholder Whisper WASM factory used when the real bundle is not built.
// Run ./scripts/build-wasm.sh to generate the optimized version.
export default async function whisperFactory() {
  console.warn('Using placeholder Whisper WASM bundle. Run ./scripts/build-wasm.sh to build the real binary.');
  return {
    FS_writeFile: () => {
      // no-op placeholder
    }
  };
}
