import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dbCredentials: { url: './sqlite.db' },
  dialect: 'sqlite',
  schema: './src/lib/db/schemas/*.ts',
  out: './src/lib/db/migrations',
})
