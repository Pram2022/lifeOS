import express from 'express';
import cors from 'cors';
import { tasksRouter } from 'module-tasks/server';

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('LifeOS API is running');
});

app.use('/tasks', tasksRouter);
// Global error-handling middleware — the final safety net. Any error not
// already handled by a route's own try/catch ends up here, so the client
// always gets a consistent JSON response instead of Express's default HTML
// error page. Must be registered after every route — Express only treats a
// 4-parameter function like this as an error handler, and only errors from
// routes registered before this point reach it.
app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: { message: 'Internal server error' } });
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
