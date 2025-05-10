const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "mydb.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
        console.log('Connecté à la base de données SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS personnes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT,
            prenom TEXT
        )`, (err) => {
            if (err) {
            } else {
                const insert = 'INSERT INTO personnes (nom, prenom) VALUES (?,?)';
                db.run(insert, ["Gontara", "Salah"]);
                db.run(insert, ["Doe", "John"]);
            }
        });
    }
});

module.exports = db;