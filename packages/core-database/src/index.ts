import { PrismaClient } from '../generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';


// Load this package's own .env file explicitly, using a path relative to
// this file's location. We can't rely on dotenv's default behavior (which
// reads from the current working directory), because the process importing
// this file might be started from apps/api, not from packages/core-database
// — and .env lives here, not there.
config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

// The Postgres driver adapter — this is what actually opens the connection,
// using the connection string we just loaded from .env.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// A single PrismaClient instance shared by every repository that imports
// this package. ES modules are only evaluated once per process, so this
// export naturally behaves as a singleton — every importer gets the same
// instance and connection pool, no matter how many files import it.
export const prisma = new PrismaClient({ adapter });
export { Priority } from '../generated/prisma/client.ts';
