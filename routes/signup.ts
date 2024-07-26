import {Router, Express, Request, Response } from "express";
import express from "express";
import bcrypt from "bcrypt";
import userSchema from "../models/signup_model";
import sendEmail from "../utils/mailer";

const router = express.Router();

const generateOtp = () => Math.floor(1000 + Math.random() *9000).toString();

router.post('/signUp', async (req:Request , res: Response) => {
    try{

    const {email,username,password} = req.body;
    const otp = generateOtp();
    const otpExpires = Date.now() + 300000;
    const isVerified = false;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new userSchema({
            username,
            email,
            password : hashedPassword,
            isVerified,
            otp,
            otpExpires
        });
        user.save();

        await sendEmail (user.email!, 'Your OTP for verification', `Your OTP for verification is ${otp}` );
        res.status(200).json({message:'successfully register , otp has sent to your mail' , user});

    }catch(error){

        res.status(500).json({error:'internel server error'});
    }

});

router.post('/verify-otp/:userId', async (req:Request ,res:Response) => {
    try{
        const {userId} = req.params;
        const {otp} = req.body;
        const user = await userSchema.findById(userId);
        if(!user){
            return res.status(400).json({message: 'user not found'});
        }
        if(user.otp !== otp ){
            return res.status(400).json({message: 'Ivalid otp '});

        }
        user.isVerified = true;
        user.otp = "";
        await user.save();
        return res.status(200).json({message: 'OTP is verified '});

    }catch(error:any){
        return res.status(500).json({message: error.message});
    }

});

router.get('/getUser', async(req,res) => {
    try{

        const userDetails = await userSchema.find();
        res.send(userDetails);

    }catch(error:any){
        res.status(500).json({message: error.message})

    }
});

router.get('/getUserById/:userId', async(req,res) => {
    try{
        const {userId} = req.params;

        const userDetails = await userSchema.findById(userId);
        res.send(userDetails);

    }catch(error:any){
        res.status(500).json({message: error.message})

    }
})

 export default router;