import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',

	dbCredentials: {
		url: '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/4b2ea6b2f5f6ba2f7d820d4bbdea0243a6df87e40e2156087a34f5f6567d9088.sqlite'
	},

	verbose: true,
	strict: true,
	dialect: 'sqlite',
	out: './migrations'
});
