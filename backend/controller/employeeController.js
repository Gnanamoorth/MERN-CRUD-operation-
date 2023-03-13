import EmployeeSchema from '../model/employeeSchema.js'

import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt'
const saltRounds = 10;
import jwt from 'jsonwebtoken';

//Register 

export const registerEmployee =asyncHandler(async function(req,res){
    try {
        const existingEmployee = await EmployeeSchema.findOne({ email: req.body.email });
    if (existingEmployee) {
      // An employee with the same email already exists
      return res.status(409).json({
        success: false,
        message: 'Employee already exists'
      });
    }
    const password =await bcrypt.hash(req.body.password,saltRounds)
    const datas={...req.body,password}
        const employee =await EmployeeSchema.create(datas)
        await res.status(201).json({
            "success": true,
            "data": { employee },
            "message": "Successfully registered"
        })
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Please provide all the details",
            "error":error.message
        })
    }
})

//Login
export const loginEmployee = asyncHandler(async function(req, res) {
    try {
      const user = await EmployeeSchema.findOne({ employeeId: req.body.employeeId });
      if (!user) {
        return res.status(404).json({ "message": "Enter your valid ID" });
      }
      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json({ "message": "Please enter the correct password" });
      }
       // set token expiration time to 5 minute from current time
    const expiresIn = 10*60; // 5 minute in seconds
      const token = jwt.sign(user.toJSON(), "verify-passwords",{ expiresIn});
      return res.status(200).json({
        user,
        token,
        message: "Successfully logged in"
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Please enter the both feilds correctly" });
    }
  });
  
//Get Employee
export const allEmployees=asyncHandler(async function(req,res){
    try {
        const employee= await EmployeeSchema.find()
        
        if (employee.length === 0) {
            return res.status(404).json({
              status: false,
              message: "There are no employees in the database."
            });
          }
        res.status(200).json({
            status:true,
            data:{employee},
            message:"All the  employee details "
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"not a valid "
        })
    }
})
