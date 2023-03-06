import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

export const ProjectCard = ({ project, onClick }) => {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 8)];
    }
    return color;
}
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="bg-white shadow-lg rounded-lg p-6 h-[180px] w-[300px] cursor-pointer" onClick={onClick} style={{ backgroundColor: getRandomColor()}}>
      <h2 className="text-[20px] font-bold text-white">{project.name}</h2>
      <p className="text-white text-[12px]">ID: {project._id}</p>
      <p className="text-white text-xl">Status: {project.status}</p>
    </div>
  </div>
  );
};

export const ProjectDetails = ({ project, onClose }) => {
  return (
    <div className="z-1 relative top-24  bg-white shadow-lg rounded-lg p-6">
      <div>
        <p className=" text-xl font-bold text-gray-800" >ProjectId : {project._id}</p>
        <p className=" text-base text-gray-700 " ><strong className='text-gray-700' > ProjectName :</strong> {project.name}</p>
                  
        <div className="flex justify-between items-center mb-3">
        <p className=" text-base text-gray-700"> <strong className='text-gray-700' > ProjectCode :</strong>
          {project.code} </p> 
        <span className="text-sm text-gray-500">
          {moment(project.startDate).format('MMM D, YYYY')}
          {project.endDate && ` - ${moment(project.endDate).format('MMM D, YYYY')}`}
        </span>
        </div>
      </div>
      <p className=" text-base text-gray-700 " ><strong className='text-gray-700' >status :</strong>  {project.status}</p>
      <div className="text-gray-700 text-base">
        <div>
          <h4 className="font-bold">Members</h4>
          {project.members.map((member) => (
            <ul key={member._id}>
              <li>
                <strong>EmployeeId: </strong>
                {member.employeeId}
              </li>
              <li>
                <strong>Employee Name: </strong>
                {member.name}
              </li>
            </ul>
          ))}
        </div>
        <p className="mb-2">
          <span className="font-bold">Description: </span>
          {project.description}
        </p>
        <p className="mb-2">
          <span className="font-bold">Attachements: </span>
          {project.attachements}
        </p>
        <p className="mb-2">
          <span className="font-bold">Logo: </span>
          {project.logo}
        </p>
        <p className="mb-2">
          <span className="font-bold">CreatedBy: </span>
          {project.createdBy}
        </p>
        <p>
          <span className="font-bold">UpdatedBy: </span>
          {project.updatedBy}
        </p>
        <p>
          <span className="font-bold">createdAt: </span>
          {project.createdAt}
        </p>
        <p>
          <span className="font-bold">UpdatedAt: </span>
          {project.updatedAt}
        </p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3000/projects/');
      setProjects(result.data);
    };
    fetchData();
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleProjectClose = () => {
    setSelectedProject(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {projects.length === 0 ? (
        <h2>Welcome To You</h2>
      ) : (
        <>
          {selectedProject ? (
            <ProjectDetails project={selectedProject} onClose={handleProjectClose} />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Project;
