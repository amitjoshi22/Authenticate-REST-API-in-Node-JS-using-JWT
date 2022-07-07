const mongoose = require('mongoose');

const connectdatabase = () => new Promise((resolve,reject) => {

	try{
		mongoose.connect(process.env.DB_URI,{
			useNewUrlParser : true,
    		useUnifiedTopology : true
		}).then(con=>{
			console.log(`MongoDB Database connected with host: ${con.connection.host}`);
		});
		console.log('Mongo Connected');
		resolve(true);
	}catch(error){
		console.log('MongoDB Connection Error: ',error);
		reject(error);

	}
});

module.exports= connectdatabase;