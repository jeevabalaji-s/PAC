const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const PORT = 3000; // You can change the port if needed

app.use(cors());
app.use(bodyParser.json());

// SQL Server Configuration
const config = {
  user: 'essl',
  password: 'essl',
  server: '192.168.1.45', // your local server IP
  database: 'Mercy',
  options: {
    encrypt: false, // must be false for local SQL Server
    trustServerCertificate: true
  }
};

// API endpoint to receive form data
app.post('/submit', async (req, res) => {
  try {
    await sql.connect(config);

    const {
      patientId,
      name,
      age,
      gender,
      bmi,
      bmiCategory
      // Add all other fields you need
    } = req.body;

    const request = new sql.Request();
    await request.query(`
      INSERT INTO PreAnesthesiaChecklist (PatientId, Name, Age, Gender, BMI, BMICategory)
      VALUES ('${patientId}', '${name}', ${age}, '${gender}', '${bmi}', '${bmiCategory}')
    `);

    res.json({ message: 'Data inserted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database insertion failed' });
  }
});

// Start HTTP server
app.listen(3000, () => {
  console.log(`Server running on http://localhost:${3000}`);
});
