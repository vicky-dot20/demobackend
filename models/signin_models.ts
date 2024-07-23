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
}
});
export  default mongoose.model('demoUser', userSchema);