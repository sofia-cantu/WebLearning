import { defineConfig } from 'drizzle-kit'
import { dbConfig } from './src/const/dbConfig'
import { isProd } from './src/const/config'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    ssl: isProd,
  },
})