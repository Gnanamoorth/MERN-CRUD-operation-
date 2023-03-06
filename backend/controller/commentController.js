import mongoose from "mongoose";
import comments from '../model/commentsSchema.js';

import asyncHandler from'express-async-handler';

export const creatComments = asyncHandler(async function (req, res) {
    const projectId = req.params.id;
    try {
        const commnets = (await comments.create({
            text:req.body.text,
            projectId :projectId,
           // name:req.user.id
        }))
        await res.status(201).json({
            "success": true,
            "data": { commnets },
            "message": "Successfully commented"
        })
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Please enter all the details",
            "error":error
        })
    }
})

export const viewComments  = asyncHandler(async function (req, res) {
    const projectId = req.params.id;
    try {
        const comment = await comments.find({ projectId: projectId })
        await res.status(201).json(comment)
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Please provide valid details",
            "error":error
        })
    }
})

export const updateComments = asyncHandler(async function (req, res) {
    try {
        const id = req.params.id;
        const updateComment = await comments.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: req.body })
        res.status(202).json({
            success:true,
            message:"successfully message is updated"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"please provide valid details"
        })
    }
})