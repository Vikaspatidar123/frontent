import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	preview: {
		host: true,
		port: 8012,
	},
	server: {
		port: 3000,
	},
	plugins: [react()],
	esbuild: {
		jsxFactory: 'h',
		jsxFragment: 'Fragment',
	},
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true,
			},
		},
	},
});
