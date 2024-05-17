import express, { NextFunction } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors'


import connectDB from './app/database/connection';
import errorHandlingMiddleware from './app/webserver/middleware/errorHandlingMiddleware';
import routes from './app/webserver/routes/routes';
import expressConfig from './app/webserver/express';
import serverConfig from './app/webserver/server';
import socketConfig from './app/websocket/socket';
import AppError from './utils/appError';
import configKeys from './config';

const app: express.Application = express();
const server = http.createServer(app);

app.use(cors())
// socket connection
const io = new Server(server, {
    cors: {
      origin: [configKeys.ORIGIN_PORT,"http://localhost:3000","http://localhost:5173"]
    }
  });


socketConfig(io);

// connecting database
connectDB();

// calling express configuration
expressConfig(app);


// starting the server 
serverConfig(server).startServer();

// routes
routes(app);


// catch 404 and forwarding to error handler
app.use(errorHandlingMiddleware) 

app.all('*', (req,res,next:NextFunction) => {
    next(new AppError('Not found', 404));
});

const all_routes = require('express-list-endpoints');
console.log(all_routes(app));

