const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
const connectdatabase =require('./config/database');
connectdatabase();

const PORT = process.env.PORT;

app.use(express.json());

const authentication = require('./routes/auth');
app.use('/app/v1/auth',authentication);

const server = app.listen(PORT,()=>{
	console.log(`Server start Port ${PORT} in ${process.env.NODE_ENV} mode`);
})