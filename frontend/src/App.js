import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Project from './api/project.jsx'
import CreateProject from './api/createProject.jsx'
import ViewProject from './api/viewProjects.jsx' 
import Login from './api/login.jsx'
import SIgnIn from './api/register.jsx'

function App() {
  return (
    <div>
       <BrowserRouter>
      <Routes>
        <Route  path="/auth/login" element={<Login/>} />
        <Route path="/auth/signin" element={<SIgnIn/>} />
        <Route path="/projects" element={<Project/>} />
        <Route path="/createproject" element={<CreateProject/>}/>
        <Route path="/viewproject" element={<ViewProject/>} />
      </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;