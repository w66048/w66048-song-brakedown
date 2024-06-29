const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM camera';
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
  const sql = 'INSERT INTO camera (name) VALUES (?)';
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
  const sql = 'UPDATE camera SET name = ? WHERE id = ?';
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

  const checkSql = 'SELECT COUNT(*) AS count FROM shot WHERE camera_id = ?';
  db.query(checkSql, [id], (err, results) => {
    if (err) {
      res.status(500).send('Error checking shot records');
      return;
    }

    if (results[0].count > 0) {
      res.status(400).send('Cannot delete camera: it is being used in shot records');
      return;
    }

    const deleteSql = 'DELETE FROM camera WHERE id = ?';
    db.query(deleteSql, [id], (err, results) => {
      if (err) {
        res.status(500).send('Error deleting camera');
        return;
      }
      res.send(`Camera with id ${id} deleted successfully`);
    });
  });
});

module.exports = router;