import  express from'express'
const worklog = express()
import{getworklog,createWorklog,getSingleWorklog} from '../controller/worklogController.js'

worklog.get('/',getworklog)
worklog.post('/createworklog',createWorklog)
worklog.get('/:logDate',getSingleWorklog)

export default worklog
