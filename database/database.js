import sqlite3 from 'sqlite3';
const sqlite3Handler = sqlite3.verbose()

const db = new sqlite3Handler.Database("../database/qrcode.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

export default db;