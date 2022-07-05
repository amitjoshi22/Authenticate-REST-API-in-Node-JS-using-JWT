const User = require('../model/user');

const ErrorHandler = require('../utils/errorHandler');

exports.register = async(req,res,next)=>{
	const{email,password,role,name} = req.body;
	if(!email){
		return next(new ErrorHandler("Email Can't be Empty",404));
	}
	const doesExist = await User.findOne({email})
	if(!doesExist){
		return next(new ErrorHandler("Email Already Exist",401))
	}
	const user = await User.create({email,password,role,name});
	res.status(200).json({
		success:true,
		data: user
	})
}

exports.login = async(req,res,next)=>{
	const {email,password} = req.body;
	if(!(email || password)){
		return next(new ErrorHandler("Please Enter the Username & Password",400))
	}
	const user = await User.findOne({email})
	if(!user){
		return nenxt(new ErrorHandler("Email Address not Find",401))

	}

}
exports.getAlluser = async(req,res,next)=>{
	res.status(200).json({
		sucess:true
	})

}
exports.getUser = async(req,res,next)=>{
	res.status(200).json({
		sucess:true
	})

}
exports.forgotPassword = async(req,res,next)=>{
	res.status(200).json({
		sucess:true
	})
}
exports.resetPassword = async(req,res,next)=>{
	res.status(200).json({
		sucess:true
	})
}
exports.logout = async(req,res,next)=>{
	res.status(200).json({
		sucess:true
	})
}