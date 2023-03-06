import express from 'express';
const project = express.Router();
import commnets from './commentRouter.js';

import {getProjectDtails,
    storeProjectDetails,
    getSingleProjectDetails,
    updateProjectDetails,
    deleteProjectDetails
} from '../controller/projectController.js';



//projectComments API to use in projectRouter
project.use('/',commnets)

project.post('/newproject',storeProjectDetails)
project.get('/',getProjectDtails)

project.route('/:idOrName?')
  .get(getSingleProjectDetails)
  .put(updateProjectDetails)
  .delete(deleteProjectDetails);


export default project