const { db } = require("./DB.config");

const SERIALIZE = () => {
  db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)");

    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
      console.log(row.id + ": " + row.info);
    });
  });

  db.close();
};

const GetAllData = async (req, res) => {
  try {
    //await db.serialize(() => {
    console.log("Database Connection open....");
    await db.all("SELECT * FROM Data_Buku", (err, rows) => {
      if (err) throw err;
      //console.log(rows);
      return res.status(200).json(rows);
    });

    //});
    //db.close();
    //console.log("Database Connection Closed....");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const InsertData = async (body) => {
  try {
    await db.serialize(() => {
      console.log("Database Connection open....");
      db.run(
        "CREATE TABLE IF NOT EXISTS Data_Buku(ID INTEGER PRIMARY KEY,judul_buku TEXT,tahun_terbit INTEGER)"
      );
      console.log(
        `INSERT INTO Data_Buku(judul_buku,tahun_terbit) VALUES('${body.JudulBuku}',${body.TahunTerbit})`
      );
      db.run(
        `INSERT INTO Data_Buku(judul_buku,tahun_terbit) VALUES('${body.JudulBuku}',${body.TahunTerbit})`,
        (err, result) => {
          if (err) throw err;
          //console.log(result);
        }
      );
      console.log("Data Successfully Inserted....");
    });
    //db.close();
    console.log("Database Connection Closed....");
  } catch (error) {
    console.log(error);
    return error;
  }
};
module.exports = { SERIALIZE, InsertData, GetAllData };
