const express = require('express');
const db = require('./db');

const app = require('./app')
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

db.sync();

