const path = require('path');
const fs = require('fs');
const baseDir = path.resolve(__dirname);
let sql = fs.readFileSync(path.join(baseDir, 'prisma/migration.sql'), 'utf8');
sql = sql.replace(/-- CreateEnum\nCREATE TYPE "(\w+)" AS ENUM \(([^)]+)\);/g, (match, name, values) => {
  return `-- CreateEnum\nDO $$ BEGIN\n  CREATE TYPE "${name}" AS ENUM (${values});\nEXCEPTION WHEN duplicate_object THEN null;\nEND $$;`;
});
sql = sql.replace(/CREATE TABLE "(\w+)"/g, 'CREATE TABLE IF NOT EXISTS "$1"');
sql = sql.replace(/CREATE UNIQUE INDEX "(\w+)" ON /g, 'CREATE UNIQUE INDEX IF NOT EXISTS "$1" ON ');
sql = sql.replace(/ALTER TABLE "(\w+)" ADD CONSTRAINT "(\w+)" FOREIGN KEY/g, (match, table, constraint) => {
  return `DO $$ BEGIN\n  ALTER TABLE "${table}" ADD CONSTRAINT "${constraint}" FOREIGN KEY`;
});
sql = sql.replace(/REFERENCES/g, 'REFERENCES');
// Close the DO blocks for ALTER TABLE
sql = sql.replace(/ON UPDATE CASCADE;/g, `ON UPDATE CASCADE;\nEXCEPTION WHEN duplicate_object THEN null;\nEND $$;`);
sql = sql.replace(/ON DELETE SET NULL ON UPDATE CASCADE;\nEXCEPTION WHEN duplicate_object THEN null;\nEND $$;/g, 'ON DELETE SET NULL ON UPDATE CASCADE;\nEXCEPTION WHEN duplicate_object THEN null;\nEND $$;');
fs.writeFileSync(path.join(baseDir, 'prisma/migration.sql'), sql);
console.log('Done - fixed migration SQL');
