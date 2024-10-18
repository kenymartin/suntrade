import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@shared":path.resolve(__dirname, "../shared"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@auth": path.resolve(__dirname, "./src/components/auth"),
      "@layout": path.resolve(__dirname, "./src/components/layout"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
  build: {
    outDir: "build",
    sourcemap:true,
    rollupOptions: {
      input: "/index.html",
      external: [
        "/assets/lib/easing/easing.min.js",
        "/assets/lib/easing/easing.js",
        "/assets/lib/owlcarousel/owl.carousel.min.js",
        "/assets/lib/owlcarousel/owl.carousel.js",
        "/assets/mail/jqBootstrapValidation.min.js",
        "/assets/mail/contact.js",
        "/assets/js/main.js",
      ],
      //output: { entryFileNames: "assets/[name]-[hash].js" },
    },
  },
});