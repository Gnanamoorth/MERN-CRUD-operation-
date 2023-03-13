import React, { useState } from 'react';
import axios from 'axios';

const CreateUserForm = () => {
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await  axios.post('http://localhost:3000/auth/register', {
        name,
        employeeId,
        email,
        password,
      });
      if(response.status === 201){
        setMessage(response.data.message)
        alert("successfully employee registerd ")
        setTimeout(()=>{
          window.location.href = '/auth/login';
        },2000)
      }
      else if (response.status === 409){
        setMessage(response.data.message)
      }
      console.log(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong, please try again"
      );
    }
    setTimeout(()=>{
      setMessage("")
    },1500)
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name:
        </label>
        <input
          className="shadow appearance-none border rounded  w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
          Employee ID:
        </label>
        <input
         className="shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         id="employeeId"
         type="employeeId"
         value={employeeId}
         onChange={(event) => setEmployeeId(event.target.value)}
         placeholder="Enter Employee ID"
       />
     </div>
     <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
        Email ID:
        </label>
        <input
         className="shadow appearance-none border rounded  w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         id="email"
         type="email"
         value={email}
         onChange={(event) => setEmail(event.target.value)}
         placeholder="Enter email ID"
       />
     </div>
     <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
        Password :
        </label>
        <input
         className="shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         id="password"
         type="password"
         value={password}
         onChange={(event) => setPassword(event.target.value)}
         placeholder="Enter name"
       />
     </div>
     {message && <div className="text-red-500 mb-4">{message}</div>}
     <button className='bg-blue-600 hover:cursor-pointer' type='submit'>Create Employee</button>
     <button className='ml-10 hover:cursor-pointer' onClick={()=>{  window.location.href = '/auth/login';}}>Go back to login</button>
     </form>
  )
}

export default CreateUserForm;