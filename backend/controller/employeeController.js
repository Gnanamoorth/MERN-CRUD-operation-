import mongoose from "mongoose";
import EmployeeSchema from '../model/employeeSchema.js'

import asyncHandler from 'express-async-handler';


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
        const employee =await EmployeeSchema.create(req.body)
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