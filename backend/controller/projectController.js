import mongoose from "mongoose";
import projectSchema from '../model/projectSchema.js';

//default error catch handler for using asyncHandler
import asyncHandler from 'express-async-handler';

/* GET ALL data */

export const getProjectDtails =asyncHandler(async function (req, res) {
    try {
        const value = await projectSchema.find()
         .populate({ path: 'members'})
        res.status(200).json(value)
    } catch (error) {
        res.json({
            message:"There is no projects in database"
        })
    }
})

/* POST  */

export const storeProjectDetails = asyncHandler(async function (req, res) {
    const {name,code,status,members,startDate,endDate,description,attachements,logo,createdBy,updatedBy}=req.body

    try {
        const existingProject = await projectSchema.findOne({code: req.body.code });
        if (existingProject) {
          // An employee with the same email already exists
          return res.status(409).json({
            success: false,
            message: 'Project is already exists'
          });
        }
        if (!name || !code || !members || !startDate || !description || !attachements || !logo || !createdBy || !updatedBy) {
          return res.status(404).json({
            "success": false,
            "message": "Please enter all the fields"
          });
        }
        
        const projectDetails = (await projectSchema.create({
            name:name,
            code:code,
            status:status,
            members:members,
            startDate:startDate,
            endDate:endDate,
            description:description,
            attachements:attachements,
            logo:logo ,
            createdBy:createdBy,
            updatedBy:updatedBy
        }))

        await res.status(201).json({
            "success": true,
            "data": { projectDetails },
            "message": "Successfully created"
        })
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Please provide all the details",
            "error":error.message
        })
    }
})

/* GET Single data*/

export const getSingleProjectDetails = asyncHandler(async function (req, res) {
    try {
      const idOrName = req.params.idOrName;

      let project;
  
      if (idOrName.match(/^[0-9a-fA-F]{24}$/)) {
        // Use ID to search for a project if the parameter matches a valid MongoDB ID
        project = await projectSchema.findOne({ _id: idOrName }).populate({ path: 'members' });
      } else {
        // Use name to search for a project if the parameter does not match a valid ID
        project = await projectSchema.findOne({ code: idOrName }).populate({ path: 'members' });
      }

      if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }
      res.status(200).json(project);

    } catch (error) {
      res.status(400).json({ message: 'Error retrieving project details', error: error });
    }
  });
  
/* Update the data */

export const updateProjectDetails = asyncHandler(async function (req, res) {
    try {
      const idOrCode = req.params.idOrName;
      let project;
  
      if (mongoose.Types.ObjectId.isValid(idOrCode)) {
        project = await projectSchema.findOneAndUpdate(
          { _id: idOrCode },
          req.body,
          { new: true }
        );
      } else {
        project = await projectSchema.findOneAndUpdate(
          { code: idOrCode },
          req.body,
          { new: true }
        );
      }
  
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
  
      res.status(202).json({
        success: true,
        message: "Project updated successfully",
        project: project,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  });

/* Delete the data */

export const deleteProjectDetails = asyncHandler(async function (req, res) {
    try {
      const idOrName = req.params.idOrName;
  
      let project;
  
      if (idOrName.match(/^[0-9a-fA-F]{24}$/)) {
        project = await projectSchema.findOne({ _id: idOrName });
      } else {
        project = await projectSchema.findOne({ code: idOrName });
      }
  
      if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }
  
      await projectSchema.deleteOne({ _id: project._id });
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'provide the valid id or code', error: error });
    }
  });
