import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: { host: true, port: 5173, proxy: { '/api': 'http://127.0.0.1:5000' } },
  resolve: { alias: { '@': '/src' } },
})