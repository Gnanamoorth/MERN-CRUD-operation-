import mongoose from "mongoose";
const {Schema} = mongoose;

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    employeeId:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const  employees = mongoose.model('employees', user);
export default employees;