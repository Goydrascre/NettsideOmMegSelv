const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const db = new sqlite3.Database('./database.db'); // Bytt ut med din filsti

// Middleware
app.use(bodyParser.json());

// Registreringsrute
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Sjekk om brukeren allerede finnes
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) return res.status(500).send('Databasefeil');
    if (row) return res.status(400).send('E-post er allerede registrert');

    // Krypter passordet før lagring
    const hashedPassword = await bcrypt.hash(password, 10);

    // Sett inn bruker i databasen
    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
      if (err) return res.status(500).send('Kunne ikke registrere bruker');
      res.status(201).send('Bruker registrert');
    });
  });
});

// Innloggingsrute
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Hent bruker fra databasen
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) return res.status(500).send('Databasefeil');
    if (!row) return res.status(400).send('E-post ikke funnet');

    // Sjekk om passordet stemmer
    const isMatch = await bcrypt.compare(password, row.password);
    if (!isMatch) return res.status(400).send('Feil passord');

    // Lag en JWT (token) og send til klienten
    const token = jwt.sign({ id: row.id, email: row.email }, 'hemmelig_nøkkel', { expiresIn: '1h' });
    res.status(200).json({ token });
  });
});

// Start serveren
app.listen(3000, () => console.log('Server kjører på port 3000'));
