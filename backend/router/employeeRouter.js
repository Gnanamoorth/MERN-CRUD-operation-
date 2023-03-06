import express from 'express';
const employee = express();
import {registerEmployee,allEmployees} from '../controller/employeeController.js'


employee.post('/register',registerEmployee)
employee.get('/employees',allEmployees)


export default employee