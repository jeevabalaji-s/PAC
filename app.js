const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const config = {
    user: "essl",
    password: "essl",
    server: "localhost", // e.g., localhost
    database: "mercy",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Insert route
app.post("/api/pac", async (req, res) => {
    try {
        await sql.connect(config);
        const { patientId, name, age, gender, bmi } = req.body;

        const result = await sql.query`INSERT INTO PACData (PatientID, Name, Age, Gender, BMI)
                                       VALUES (${patientId}, ${name}, ${age}, ${gender}, ${bmi})`;

        res.status(200).send("Inserted Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving data");
    }
});

app.listen(1433, () => console.log("Server running on http://localhost:1433"));
