import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host:true , 
    strictPort: true , 
    port : 82,
  },
  plugins: [react()],
})
