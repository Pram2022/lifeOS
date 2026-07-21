import express from 'express';
import { tasksRouter } from 'module-tasks/server';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('LifeOS API is running');
});

app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
