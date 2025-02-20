import initSqlJs from "sql.js";

let db: any = null;

export const initDb = async () => {
  if (db) return db;

  const SQL = await initSqlJs({
    locateFile: (file) =>
      new URL(`/sql-wasm.wasm`, window.location.origin).href,
  });

  db = new SQL.Database();

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS cigar_entries (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      brand TEXT NOT NULL,
      name TEXT NOT NULL,
      wrapper_type TEXT NOT NULL,
      binder TEXT,
      filler TEXT,
      price TEXT,
      environmental_date TEXT NOT NULL,
      humidity INTEGER NOT NULL,
      tasting_notes TEXT,
      taste_rating INTEGER NOT NULL,
      construction_rating INTEGER NOT NULL,
      value_rating INTEGER NOT NULL,
      band_aesthetics_rating INTEGER NOT NULL
    )
  `);

  return db;
};

export const getDb = () => {
  if (!db) throw new Error("Database not initialized");
  return db;
};
