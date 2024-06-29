const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./db');
const songsRouter = require('./Controllers/songs');
const descriptionsRouter = require('./Controllers/descriptions');
const camerasRouter = require('./Controllers/cameras');
const shotsRouter = require('./Controllers/shots');

app.use(cors());
app.use(express.json());

app.use('/songs', songsRouter);
app.use('/descriptions', descriptionsRouter);
app.use('/cameras', camerasRouter);
app.use('/shots', shotsRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});