// app.js
const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // allow requests from different origins

// MSSQL config
const dbConfig = {
  user: 'essl',
  password: 'essl',
  server: '192.168.1.45',
  database: 'Mercy',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

// API endpoint
app.post('/submit', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const request = new sql.Request();

    // Example insert – adjust according to your DB schema
    await request.query(`
      INSERT INTO PACData (PatientID, Name, Age, Gender)
      VALUES (
        '${req.body.patientId}',
        '${req.body.name}',
        ${req.body.age},
        '${req.body.gender}'
      )
    `);

    res.json({ message: 'Data inserted successfully' });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// HTTPS certificate (self-signed)
const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// Start server
https.createServer(httpsOptions, app).listen(3000, () => {
  console.log('HTTPS Server running on https://192.168.1.45:3000');
});
