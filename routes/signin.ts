import {Router, Express, Request, Response } from "express";
import express from "express";
import userSchema from "../models/signup_model";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signin', async (req,res) => {

    try{

        const {email, password} = req.body;

    const user = await userSchema.findOne({email});
    if (password !== user?.password){
            return res.status(400).json({message: "inavlid password"});
    }
    const body ={
        _id:user?._id,
        email: user?.email
    }
    const jwt_secret = 'it_is_my_secret';
    const token =jwt.sign({user:body}, jwt_secret);
    res.status(200).json({token, message:"successfully loggedin"});

    }catch(error){

        res.status(500).json({
            message:"Internel server error"
        });

    }
    
});

export default router;