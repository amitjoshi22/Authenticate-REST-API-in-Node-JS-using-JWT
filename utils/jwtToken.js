const JWT = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler');
module.exports ={
	signAccessToken:(userId)=>{
		return new Promise((resolve,reject)=>{
			const payload = {}
      		const secret = process.env.JWT_SECRET;
      		const options = {
      			expiresIn: '1h',
      			issuer: 'enrichway.com',
      			audience: userId
      		}
      		JWT.sign(payload,secret,options,(error,token)=>{
      			if(error){
      				reject(new ErrorHandler('JWT Token Error Server Error',401));
      				return
      			}
      			resolve(token)
      		})
		});
	}

}