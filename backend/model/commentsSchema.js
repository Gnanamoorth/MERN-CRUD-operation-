import mongoose from "mongoose";
const {Schema} = mongoose;
mongoose.set('strictQuery', false);

const commentSchema = new Schema({
   name: {
    type: Schema.Types.ObjectId,
    ref: 'employees',
    required: false
  }, 
  projectId: {
    type:Schema.Types.ObjectId,
    ref: 'ProjectDetails',
    required: true
  },
  text: {
    type: String,
    required: true
  }
  },
  {
    timestamps: true
 }
  );

const projectComments = mongoose.model('projectcomments', commentSchema);
export default projectComments;
