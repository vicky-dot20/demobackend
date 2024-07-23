import {Router, Express, Request, Response } from "express";
import express from "express";
import userSchema from "../models/signup_model";

const router = express.Router();
router.post('/signUp', async (req:Request , res: Response) => {

    const {email,username,password} = req.body;
    try{

        const user = new userSchema({
            username,
            email,
            password
        });
        user.save();
        res.status(200).json({message:'successfully register' , user});

    }catch(error){

        res.status(500).json({error:'internel server error'});
    }

});

 export default router;