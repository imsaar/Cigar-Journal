import { getDb } from "./db";

export interface CigarEntry {
  id: string;
  date: Date;
  basicInfo: {
    brand: string;
    name: string;
    wrapperType: string;
    binder: string;
    filler: string;
    price: string;
  };
  environmental: {
    date: Date;
    humidity: number;
  };
  tastingNotes: string;
  ratings: {
    taste: number;
    construction: number;
    value: number;
    bandAesthetics: number;
  };
}

export const saveCigarEntry = (entry: Omit<CigarEntry, "id">) => {
  const db = getDb();
  const id = crypto.randomUUID();

  db.run(
    `INSERT INTO cigar_entries (
      id, date, brand, name, wrapper_type, binder, filler, price,
      environmental_date, humidity, tasting_notes,
      taste_rating, construction_rating, value_rating, band_aesthetics_rating
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      entry.date.toISOString(),
      entry.basicInfo.brand,
      entry.basicInfo.name,
      entry.basicInfo.wrapperType,
      entry.basicInfo.binder,
      entry.basicInfo.filler,
      entry.basicInfo.price,
      entry.environmental.date.toISOString(),
      entry.environmental.humidity,
      entry.tastingNotes,
      entry.ratings.taste,
      entry.ratings.construction,
      entry.ratings.value,
      entry.ratings.bandAesthetics,
    ],
  );

  return { ...entry, id };
};

export const updateCigarEntry = (id: string, entry: Omit<CigarEntry, "id">) => {
  const db = getDb();

  db.run(
    `UPDATE cigar_entries SET
      date = ?, brand = ?, name = ?, wrapper_type = ?, binder = ?, 
      filler = ?, price = ?, environmental_date = ?, humidity = ?,
      tasting_notes = ?, taste_rating = ?, construction_rating = ?,
      value_rating = ?, band_aesthetics_rating = ?
    WHERE id = ?`,
    [
      entry.date.toISOString(),
      entry.basicInfo.brand,
      entry.basicInfo.name,
      entry.basicInfo.wrapperType,
      entry.basicInfo.binder,
      entry.basicInfo.filler,
      entry.basicInfo.price,
      entry.environmental.date.toISOString(),
      entry.environmental.humidity,
      entry.tastingNotes,
      entry.ratings.taste,
      entry.ratings.construction,
      entry.ratings.value,
      entry.ratings.bandAesthetics,
      id,
    ],
  );

  return { ...entry, id };
};

const rowToEntry = (row: any): CigarEntry => ({
  id: row.id,
  date: new Date(row.date),
  basicInfo: {
    brand: row.brand,
    name: row.name,
    wrapperType: row.wrapper_type,
    binder: row.binder,
    filler: row.filler,
    price: row.price,
  },
  environmental: {
    date: new Date(row.environmental_date),
    humidity: row.humidity,
  },
  tastingNotes: row.tasting_notes,
  ratings: {
    taste: row.taste_rating,
    construction: row.construction_rating,
    value: row.value_rating,
    bandAesthetics: row.band_aesthetics_rating,
  },
});

export const getCigarEntries = (): CigarEntry[] => {
  const db = getDb();
  const result = db.exec("SELECT * FROM cigar_entries ORDER BY date DESC");
  if (!result.length) return [];

  return result[0].values.map((row: any) => {
    const entry: any = {};
    result[0].columns.forEach((col: string, i: number) => {
      entry[col] = row[i];
    });
    return rowToEntry(entry);
  });
};

export const getCigarEntry = (id: string): CigarEntry | null => {
  const db = getDb();
  const result = db.exec("SELECT * FROM cigar_entries WHERE id = ?", [id]);
  if (!result.length || !result[0].values.length) return null;

  const entry: any = {};
  result[0].columns.forEach((col: string, i: number) => {
    entry[col] = result[0].values[0][i];
  });
  return rowToEntry(entry);
};
