import express from 'express';
const employee = express();
import {registerEmployee,loginEmployee,allEmployees} from '../controller/employeeController.js'


employee.post('/register',registerEmployee)
employee.post('/login',loginEmployee)

employee.get('/employees',allEmployees)


export default employee