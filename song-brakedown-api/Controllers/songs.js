const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM song';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO song (name) VALUES (?)';
  db.query(sql, [name], (err, results) => {
    if (err) {
      console.error('Error inserting record:', err.stack);
      res.status(500).send('Error inserting record');
      return;
    }
    res.json({ id: results.insertId, name }); 
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const sql = 'UPDATE song SET name = ? WHERE id = ?';
  db.query(sql, [name, id], (err, results) => {
    if (err) {
      console.error('Error updating record:', err.stack);
      res.status(500).send('Error updating record');
      return;
    }
    res.send(`Record with id ${id} updated successfully`);
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM song WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error deleting record:', err.stack);
      res.status(500).send('Error deleting record');
      return;
    }
    res.send(`Record with id ${id} deleted successfully`);
  });
});

module.exports = router;