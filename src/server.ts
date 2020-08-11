import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import routes from './routes';
const db = require('./database')();

require('dotenv').config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}))
app.use(routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
})