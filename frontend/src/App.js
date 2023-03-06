import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project from './api/project.jsx'
import CreateProject from './api/createProject.jsx'
import ViewProject from './api/viewProjects.jsx' 

import Navbar from './navbar/navbar.jsx'

function App() {
  return (
    <div>
    <Navbar/> 
       <BrowserRouter>
      <Routes>
        <Route path="/projects" element={<Project/>} />
        <Route path="/createproject" element={<CreateProject/>} />
        <Route path="/viewproject" element={<ViewProject/>} />
      </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;