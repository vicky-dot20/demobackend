import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

username:{
    type: String
},
email: {
    type:String
},
password: {
    type:String
},
isVerified :{
    type:Boolean,
    default: false
},
otp:{
    type:String,
    //required:true
},
otpExpires:{
    type:Date,
    required:true
}
});
export  default mongoose.model('demoUser', userSchema);
