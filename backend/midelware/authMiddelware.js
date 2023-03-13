import employeSchema from '../model/employeeSchema.js'
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { ObjectId } from "mongodb";

export const authMiddelware =asyncHandler(async function(req,res,next){
    if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[1]) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decoded = await jwt.verify(token, "verify-passwords")
            await employeSchema.findOne({ _id: ObjectId(decoded.employeSchema_id) })
            next()
        } catch (error) {
            res.json({ err: "unauthorized" })
        }
        if (!token) {
            res.status(401);
            throw new Error("Not authorized, no token");
          }
    }
})

