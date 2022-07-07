const User = require('../model/user');
const {signAccessToken} = require('../utils/jwtToken');
const crypto = require('crypto');
const ErrorHandler = require('../utils/errorHandler');

exports.register = async(req,res,next)=>{
	const{email,password,role,name} = req.body;
	if(!email){
		return next(new ErrorHandler("Email Can't be Empty",404));
	}
	const doesExist = await User.findOne({email})
	//console.log(doesExist);
	if(doesExist){
		return next(new ErrorHandler("Email Already Exist",401))
	}
	const user = await User.create({email,password,role,name});
	const accessToken = await signAccessToken(user.id);
	res.status(200).json({
		success:true,
		accessToken: accessToken
	})
}

exports.login = async(req,res,next)=>{
	const {email,password} = req.body;
	if(!email || !password){
		return next(new ErrorHandler("Please Enter the Username & Password",400))
	}
	const user = await User.findOne({email}).select('+password')
	if(!user){
		return nenxt(new ErrorHandler("Email Address not Find",401))
	}
	//Check if password Correct
	const isPasswordMatched = await user.comparePassword(password);
	if(!isPasswordMatched){
		return next(new ErrorHandler("Password Doen't Match",400))

	}
	const accessToken = await signAccessToken(user.id);
	// Options for cookie
    const options = {
        expires : new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24*60*60*1000),
        httpOnly : true
    };
	res.status(200).cookie('token',accessToken, options).json({
		success:true,
		message:'User Logged In',
		token: accessToken
	})
}
exports.getAlluser = async(req,res,next)=>{
	const user	= await User.find();
	res.status(200).json({
		sucess:true,
		data:user
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
	const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
        console.log(resetPasswordToken);
	res.status(200).json({
		sucess:true
	})
}
exports.logout = async(req,res,next)=>{
	res.cookie('token','',{
		expires : new Date(Date.now()),
        httpOnly : true 
	})
	res.status(200).json({
		sucess:true,
		message:'Success!! Logout'
	})
}