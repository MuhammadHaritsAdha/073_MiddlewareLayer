import express from 'express';
import pg from 'pg';
import Joi, { allow } from 'joi';

const app = express();
const port = 3000;
const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: '123',
    port: 5432,
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//MIDDLEWARE LOGGING
app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        console.log({
            method: req.method, 
            url: req.originalUrl, 
            statusCode: res.statusCode, 
            duration: `${duration}ms`,
        })
    })

    next()
})