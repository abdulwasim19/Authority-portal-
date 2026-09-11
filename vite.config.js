import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// M6 — Authority Portal. Runs standalone on its own port during
// independent development; final path prefix/proxy to M3 will be
// confirmed with M1 at integration time.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5176,
  },
});
