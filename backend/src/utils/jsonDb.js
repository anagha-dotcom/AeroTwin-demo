const fs = require('fs');
const path = require('path');
const AppError = require('./AppError');

const DATA_DIR = path.join(__dirname, '..', 'data');

/**
 * AeroTwin's "database" for this hackathon prototype is a set of JSON
 * files under backend/src/data/. This module is the only place that
 * touches the filesystem directly — services call readCollection /
 * writeCollection and never `fs` or a file path themselves, so the
 * storage layer can be swapped for a real database later without
 * touching business logic.
 */

function collectionPath(name) {
  // Guard against path traversal via a malformed collection name.
  const safeName = path.basename(name);
  return path.join(DATA_DIR, `${safeName}.json`);
}

/**
 * Reads a named JSON collection (e.g. "missions" -> data/missions.json).
 * If the file doesn't exist yet, it is created with `fallback` so callers
 * never have to special-case a missing file.
 */
function readCollection(name, fallback = []) {
  const filePath = collectionPath(name);
  if (!fs.existsSync(filePath)) {
    writeCollection(name, fallback);
    return fallback;
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    throw new AppError(
      `Failed to read mock database collection "${name}": ${err.message}`,
      500,
      'DB_READ_ERROR'
    );
  }
}

/** Overwrites a named JSON collection with `data`. */
function writeCollection(name, data) {
  const filePath = collectionPath(name);
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    throw new AppError(
      `Failed to write mock database collection "${name}": ${err.message}`,
      500,
      'DB_WRITE_ERROR'
    );
  }
  return data;
}

/** Appends a single record to a named collection and persists it. */
function appendToCollection(name, record, fallback = []) {
  const current = readCollection(name, fallback);
  current.push(record);
  writeCollection(name, current);
  return record;
}

module.exports = {
  readCollection,
  writeCollection,
  appendToCollection,
};
