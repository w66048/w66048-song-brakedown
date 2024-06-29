const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:songId', (req, res) => {
  const { songId } = req.params;
  const sql = `
    SELECT s.id, s.song_id, s.camera_id, s.description_id, s.duration, c.name as camera_name, d.name as description_name
    FROM shot s
    LEFT JOIN camera c ON s.camera_id = c.id
    LEFT JOIN description d ON s.description_id = d.id
    WHERE s.song_id = ?
  `;
  db.query(sql, [songId], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { song_id, camera_id, description_id, duration } = req.body;
  const sql = 'INSERT INTO shot (song_id, camera_id, description_id, duration) VALUES (?, ?, ?, ?)';
  db.query(sql, [song_id, camera_id, description_id, duration], (err, results) => {
    if (err) {
      console.error('Error inserting record:', err.stack);
      res.status(500).send('Error inserting record');
      return;
    }
    res.json({ id: results.insertId, song_id, camera_id, description_id, duration });
  });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { camera_id, description_id, duration } = req.body;
  
    console.log('Update request:', { id, camera_id, description_id, duration }); //debug
  
    const sql = 'UPDATE shot SET camera_id = ?, description_id = ?, duration = ? WHERE id = ?';
    db.query(sql, [camera_id, description_id, duration, id], (err, results) => {
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
  const sql = 'DELETE FROM shot WHERE id = ?';
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