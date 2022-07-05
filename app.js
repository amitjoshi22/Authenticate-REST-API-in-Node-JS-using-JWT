const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
const auth = require('./router/auth');

const PORT = process.env.PORT;


app.use('/app/v1',auth)

const server = app.listen(PORT,()=>{
	console.log(`Server start Port ${PORT} in ${process.env.NODE_ENV} mode`);
})