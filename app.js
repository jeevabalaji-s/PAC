const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();

const key = fs.readFileSync('key.pem');
const cert = fs.readFileSync('cert.pem');

https.createServer({ key, cert }, app).listen(3000, () => {
  console.log('HTTPS Server running at https://localhost:3000');
});
