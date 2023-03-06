import worklogSchema from '../model/worklogSchema.js'
import asyncHandler from 'express-async-handler';

/* GET ALL Worklog */
export const getworklog = async function(req,res){
    const worklog = await worklogSchema.find()
    res.json(worklog)
}
/* POST Worklog  */
export const createWorklog=asyncHandler(async function(req,res){
    const {projectId,taskId,logDate,hoursWorked,description,attachments}=req.body
   // const{employeeId}=req.userr.Id
    try {
        const worklog= await worklogSchema.create({
            projectId:projectId,
            /* taskId:taskId,
            employeeId:employeeId, */
            logDate:logDate,
            hoursWorked:hoursWorked,
            description:description,
            attachments:attachments
        })
        await res.json({"success":true,
        "data":{worklog},
        "message":"successfully created"
     })
    } catch (error) {
        res.status(400).json({"success":false,
        "message":"Please enter all the details",
        "error":error
    })
    }
})
/* GET Single Worklog*/
export const getSingleWorklog = asyncHandler(async function (req, res) {
    try {
        const id = req.params.logDate;
       const getSingleWorklog = await worklogSchema.findOne({logDate:id})
        res.status(200).json(getSingleWorklog);
    } catch (error) {
        res.status(400).json({ message:"please provide the valid details" })
    }
})
