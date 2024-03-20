/* eslint-disable consistent-return */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     port: 3000
//   },
//   plugins: [react()],
//   esbuild: {
//     jsxFactory: 'h',
//     jsxFragment: 'Fragment',
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         quietDeps: true
//       }
//     }
//   }
// })
export default defineConfig({
	plugins: [react()],
	server: {
		watch: {
			usePolling: true,
		},
		host: true, // needed for the Docker Container port mapping to work
		strictPort: true,
		port: 3000, // you can replace this port with any port
	},
	preview: {
		port: 3000,
	},
	// base: './index.html',
	build: {
		input: {
			app: './index.html', // default
		},
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id
							.toString()
							.split('node_modules/')[1]
							.split('/')[0]
							.toString();
					}
				},
			},
		},
	},
});
