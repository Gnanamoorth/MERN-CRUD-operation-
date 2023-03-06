import mongoose from "mongoose";
const {Schema} = mongoose;
mongoose.set('strictQuery', false);

const Project = new Schema({

    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [ 'Inprogress', 'Completed'],
        default:"Inprogress",
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'employees',
        required:true
    }],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        require: true
    },
    attachements:[{
        type: String,
        required: true
    }],
    logo: {
        type: String,
        required: true
    },
    createdBy: {
        type:String,
        required: true
    },
    updatedBy: {
       type: String,
      required: true
    },
    },
    {
        timestamps: true
    })

const ProjectDetails = mongoose.model('ProjectDetails', Project);
export default ProjectDetails;