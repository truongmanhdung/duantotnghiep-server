import express from 'express';
import sors from 'cors';
import morgan from 'morgan';
import mongoose from "mongoose";
import {readdirSync} from "fs";

require("dotenv").config();

const app = express();




//connect db


mongoose.connect(process.env.DATABASE_URI)
.then(() => {
    console.log("connect db successfully")
})
.catch(error => console.log(error));


//middlware
app.use(morgan('tiny'));
app.use(express.json());
app.use(sors());





//router
readdirSync('./src/routes').map(route => {
    return app.use("/api",require(`./src/routes/${route}`))
})

// app.use("/api",require('./routes/auth'));

// post
const post = process.env.PORT | 8080;
app.listen(post, () => {
    console.log('server is running port: http://localhost:'+post);
}) 




