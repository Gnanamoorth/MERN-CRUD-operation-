import mongoose from "mongoose";
const {Schema} = mongoose;
mongoose.set('strictQuery', false);

const worklog = new Schema({

    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'projectDetails',
        required: true
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'task',
        required: false
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'employees',
        required: false
    },
    logDate: {
        type: String,
        required: true,
        default:Date.now()
    },
    hoursWorked: {
        type: Number,
        required: true,
       
    },
    description: {
        type: String,
        required: true
    },
    attachments:[
        {
            type:String,
            required:false
        }
    ]
},
    {
        timestamps: true
    }
)
const worklogSchema = mongoose.model('worklog', worklog);
export default worklogSchema