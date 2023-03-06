import express from 'express';
const server = express();
import cors from 'cors';

import mongoose from './configure/database.js'

import employee from './router/employeeRouter.js'
import Project from './router/projectRouter.js'
import worklog from './router/worklogRouter.js'


const port = 3000
//use for request body 
server.use(express.json());
server.use(cors());
/* Middelware */

//employee Router
server.use('/auth',employee)

//project router
server.use('/projects', Project)

//Worklog Router
server.use('/worklog', worklog)

server.use((req, res, next) => {
    res.status(404).json({ message: "please provide a valid Endpoints" });
    
  });
/* connecting database */

mongoose()
    .then(() => {
        server.listen(port)
    })
    .catch((err) => {
        console.log(err);
    })
