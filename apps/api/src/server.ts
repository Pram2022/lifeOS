import express from 'express';

const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('LifeOS API is running');
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
