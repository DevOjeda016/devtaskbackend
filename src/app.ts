import express, { Request, Response, Router } from 'express';
import db from './db/index';
import userRouter from './modules/users/index';
import errorHandler from './middleware/errorHandler';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  db.connectToDb();
}

// Middleware to parse JSON request bodies
// This middleware is used to parse incoming JSON requests and make the data available in req.body
// It is important to use this middleware before defining the routes
// so that the request body is parsed before reaching the route handlers
app.use(express.json());

//app.get('/', (req: Request, res: Response) => res.send('Hello world'));
app.use('/api/users', userRouter);

// Middleware to handle errors
app.use(errorHandler);

export default app;

/**
 * @author: Daniel Ojeda Luna
 * @alias: devOjeda
*/
