import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required : true,
  },
  roles: [{
    type: String,
    default: 'employee'
  }],
  active:{
    type: Boolean,
    default: true
  }
});

const User = mongoose.model("User", userSchema)

export default User;