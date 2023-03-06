import express from 'express';
const commnets = express();
import {creatComments,viewComments,updateComments} from '../controller/commentController.js'

commnets.post('/:id/postcomments',creatComments)
commnets.get('/:id/viewcomments',viewComments)
commnets.put('/:id/updatecomments',updateComments)

export default commnets