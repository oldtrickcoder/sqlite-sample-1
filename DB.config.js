const sqlite3 = require("sqlite3").verbose();
const dbFile = __dirname + "/db/sample.db";
//const db = new sqlite3.Database(":memory:");
const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) throw err;
});
module.exports = { db };
