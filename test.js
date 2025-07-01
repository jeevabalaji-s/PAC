const sql = require('mssql');

// Replace with your actual SQL Server config
const config = {
  user: 'essl',                       // your SQL username
  password: 'essl',   // your SQL password
  server: '192.168.1.45',           // SQL Server IP
  port: 1433,
  database: 'MERCY',           // your database
  options: {
    encrypt: false,                 // true if using Azure or SSL
    trustServerCertificate: true    // required for local dev
  }
};

async function testConnection() {
  try {
    // connect
    await sql.connect(config);

    // test query: create table if not exists
    await sql.query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'TestPatients')
      CREATE TABLE TestPatients (id INT PRIMARY KEY IDENTITY, name NVARCHAR(100));
    `);

    // insert dummy data
    await sql.query`INSERT INTO TestPatients (name) VALUES ('Test User')`;

    // read data
    const result = await sql.query`SELECT * FROM TestPatients`;

    console.log("Connected & Fetched rows:");
    console.table(result.recordset);
  } catch (err) {
    console.error("? Error connecting to SQL Server:", err);
  } finally {
    sql.close();
  }
}

testConnection();
