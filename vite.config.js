import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       api: "modern-compiler"
  //     }
  //   }
  // }
  base: process.env.NODE_ENV === "production" ? "/repsept/" : ""
})
