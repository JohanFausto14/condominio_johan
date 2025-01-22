import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Escucha en todas las interfaces
    port: Number(process.env.PORT) || 3000, // Convierte PORT a número o usa 3000 como valor por defecto
  },
});
