const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,'Please provide the name'],
		maxlength:200,
		trim:true
	},
	email:{
		type:String,
		match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'],
       unique : true,
       trim:true
	},
	password:{
		type:String,
		require:[true,'Please enter password for your account'],
		minlength:[8,'Your password must be at least 8 characters long'],
		select:false
	},
	role:{
		type:String,
		enum:{
			values:['user','employeer'],
			message:'Please select correct role'
		},
		default:'user'
	},
	createdAt:{
		type:Date,
		default: Date.now()
	},
})

module.exports = mongoose.model('User',UserSchema)