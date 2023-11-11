import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, " Name Required"]
    },
    password:{
        type:String,
        required:[true, "password Required"]
    },

    username:{
        type:String,
        required:[true, " UserName Required"]
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})



const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;