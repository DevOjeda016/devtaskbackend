import express from 'express';
import apiAuth from './modules/auth/index.js';
import db from './db/index.js';
import userRouter from './modules/users/index.js';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  db.connectToDb();
}

app.use(express.json());
app.get('/', (req, res) => res.send('Hello world'));
app.use('/api/auth', apiAuth);
app.use('/api/users', userRouter);

export default app;
