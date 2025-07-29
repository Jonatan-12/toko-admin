const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ubah sesuai user MySQL kamu
    password: '',       // ubah jika ada password MySQL
    database: 'toko'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database Connected...');
});

module.exports = db;
