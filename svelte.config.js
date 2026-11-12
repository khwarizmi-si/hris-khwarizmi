import adapter from '@sveltejs/adapter-static';

// Landing page murni statis: semua halaman di-prerender ke folder build/
// lalu di-deploy sebagai static assets (lihat wrangler.jsonc).
/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) =>
			filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
	kit: {
		adapter: adapter({ pages: 'build', assets: 'build' })
	}
};

export default config;
