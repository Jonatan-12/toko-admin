const express = require('express');
const router = express.Router();
const db = require('../db');

// Halaman utama daftar pembelian
router.get('/', (req, res) => {
    const sql = `SELECT p.*, pr.nama AS nama_produk
                 FROM pembelian p
                 JOIN produk pr ON p.produk_id = pr.id
                 ORDER BY tanggal DESC`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render('index', { pembelian: result });
    });
});

// Form tambah pembelian
router.get('/pembelian/tambah', (req, res) => {
    db.query("SELECT * FROM produk", (err, produk) => {
        if (err) throw err;
        res.render('formPembelian', { produk });
    });
});

// Simpan pembelian baru
router.post('/pembelian/tambah', (req, res) => {
    const { produk_id, jumlah } = req.body;
    db.query("SELECT harga FROM produk WHERE id=?", [produk_id], (err, result) => {
        if (err) throw err;
        const total = result[0].harga * jumlah;
        db.query("INSERT INTO pembelian (produk_id, jumlah, total) VALUES (?,?,?)",
            [produk_id, jumlah, total],
            (err) => {
                if (err) throw err;
                res.redirect('/');
            });
    });
});

// Cancel pembelian
router.get('/pembelian/cancel/:id', (req, res) => {
    const id = req.params.id;
    db.query("UPDATE pembelian SET status='canceled' WHERE id=?", [id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

module.exports = router;
