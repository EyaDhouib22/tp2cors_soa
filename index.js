const express = require('express');
const cors = require('cors'); 
const rateLimit = require('express-rate-limit');
const db = require('./database.js'); 
const app = express();
const PORT = 3000;

app.use(express.json());

// 1. Configuration CORS : Autoriser toutes les origines
app.use(cors());

// 2. Configuration du Rate Limiting : 100 requêtes/15 min
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP à 100 requêtes par fenêtre de 15 minutes
    message: 'Trop de requêtes effectuées depuis cette IP, veuillez réessayer après 15 minutes.'
});
app.use(limiter);
// Route GET pour récupérer toutes les personnes
app.get("/personnes", (req, res) => {
    const sql = "SELECT * FROM personnes";
    db.all(sql, [], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        });
    });
});

// Route POST pour ajouter une personne
app.post("/personnes", (req, res) => {
    const { nom, prenom } = req.body;
    if (!nom || !prenom) {
        res.status(400).json({"error": "Veuillez fournir un nom et un prénom"});
        return;
    }
    const sql = 'INSERT INTO personnes (nom, prenom) VALUES (?,?)';
    const params = [nom, prenom];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, nom, prenom },
        });
    });
});

// Autres routes CRUD (GET by ID, PUT, DELETE) peuvent être ajoutées ici...

app.listen(PORT, () => {
console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log('CORS activé pour toutes les origines.');
    console.log('Rate limiting activé: 100 requêtes par IP toutes les 15 minutes.');});