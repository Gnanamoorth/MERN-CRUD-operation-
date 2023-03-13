import React, { useState ,useEffect} from "react";
import axios from "axios";
import Navbar from '../navbar/navbar.jsx'
import withAuth from "./withauth.jsx";

const NewProjectForm = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [members, setMembers] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [attachements, setAttachements] = useState([]);
  const [logo, setLogo] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  //store the token 
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  
  useEffect(() => {
    const storedCreatedBy = localStorage.getItem('name');
    if (storedCreatedBy) {
      setCreatedBy(storedCreatedBy);
    }

    const storedUpdatedBy = localStorage.getItem('name');
    if (storedUpdatedBy) {
      setUpdatedBy(storedUpdatedBy);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res= await axios.post("http://localhost:3000/projects/newproject", {
        name,
        code,
        status,
        members,
        startDate,
        endDate,
        description,
        attachements,
        logo,
        createdBy,
        updatedBy,
      });

      if (res.status === 201) {
        setMessage(res.data.message);
        setTimeout(() => {
          window.location.href = '/projects';
        }, 2000);
        const projectDetails = {
          name,
          code,
          status,
          members,
          startDate,
          endDate,
          description,
          attachements,
          logo,
          createdBy,
          updatedBy,
        };
        localStorage.setItem('projectDetails', JSON.stringify(projectDetails));
      } else if (res.status === 409) {
        setMessage(res.data.error);
        console.log(res.data.error);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      console.log(error.response.data.error)
    }
    setTimeout(()=>{
      setMessage("")
    },1500)
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setMessage('');
  }

  const handleGoBack = () => {
    setShowForm(false);
  }
  const reset =()=>{
    setName("");
    setCode("");
    setStatus("");
    setMembers([]);
    setStartDate("");
    setEndDate("");
    setDescription("");
    setAttachements([]);
    setLogo("");
    setMessage("");
    setShowForm(false);
  }
  return (
    <div>
      <Navbar/> 
      <button className="fixed top-1/2 left-[45%] w-32 h-16 rounded-full bg-blue-500 text-white p-3  shadow-lg hover:bg-blue-600 hover:cursor-pointer" onClick={toggleForm}>
      <p className="">+ Create Project</p>
    </button>
    {showForm &&(
   <div className="z-1 relative top-24 max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
   <div className="p-6">
     <form onSubmit={handleSubmit}>
       <div className="grid grid-cols-2 gap-4 mb-4">
         <div className="col-span-2 sm:col-span-1">
           <label className="block font-medium text-gray-700">Name:</label>
           <input
             type="text"
             value={name}
             onChange={(e) => setName(e.target.value)}
             className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
           />
         </div>
         <div className="col-span-2 sm:col-span-1">
           <label className="block font-medium text-gray-700">Code:</label>
           <input
             type="text"
             value={code}
             onChange={(e) => setCode(e.target.value)}
             className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
           />
         </div>
       </div>
       <div className="grid grid-cols-2 gap-4 mb-4">
         <div className="col-span-2 sm:col-span-1">
           <label className="block font-medium text-gray-700">Status:</label>
           <select
             value={status}
             onChange={(e) => setStatus(e.target.value)}
             className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
           >
             <option value="Inprogress">Inprogress</option>
             <option value="Completed">Completed</option>
           </select>
         </div>
         <div className="col-span-2 sm:col-span-1">
           <label className="block font-medium text-gray-700">Members:</label>
           <textarea
             value={members}
             onChange={(e) => setMembers(e.target.value.split(" , "))}
             className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
           ></textarea>
         </div>
       </div>
       <div className="grid grid-cols-2 gap-4 mb-4">
         <div className="col-span-2 sm:col-span-1">
           <label className="block font-medium text-gray-700">Start Date:</label>
           <input
             type="date"
             value={startDate}
             onChange={(e) => setStartDate(e.target.value)}
             className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
           />
         </div>
         <div className="col-span-2 sm:col-span-1">
           <label className="block font-medium text-gray-700">End Date:</label>
           <input
             type="date"
             value={endDate}
             onChange={(e) => setEndDate(e.target.value)}
             className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
           />
         </div>
       </div>
       <div className="col-span-2 sm:col-span-1">
           <label className="block font-medium text-gray-700">Description:</label>
           <input
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
           ></input>
         </div>
         <div className="col-span-2 sm:col-span-1">
           <label className="block font-medium text-gray-700">Attachment:</label>
           <input
             value={attachements}
             onChange={(e) => setAttachements(e.target.value)}
             className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
           />
         </div>
         <div className="col-span-2 sm:col-span-1">
           <label className="block font-medium text-gray-700">Logo:</label>
           <input
             value={logo}
             onChange={(e) => setLogo(e.target.value)}
             className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
           />
         </div>

         <div className="grid grid-cols-2 gap-4 mb-4">
         <div className="col-span-2 sm:col-span-1">
           <label className="block font-medium text-gray-700">CreateBy:</label>
           <input
             type="text"  
             value={createdBy}
             className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
           />
         </div>
         <div className="col-span-2 sm:col-span-1">
           <label className="block font-medium text-gray-700">UpdatedBy:</label>
           <input
             type="text"
             value={updatedBy}
             className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
           />
         </div>
       </div>
       <button className="bg-red-800 w-20 h-8 text-white" type="reset hover:cursor-pointer" onClick={()=>{handleGoBack();reset()}}  >Cancel</button>
      <button className= "bg-blue-800 w-20 h-8  text-white ml-48 hover:cursor-pointer" type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
    </div>
    </div>
)}
    </div>
  );
};

export default withAuth(NewProjectForm);