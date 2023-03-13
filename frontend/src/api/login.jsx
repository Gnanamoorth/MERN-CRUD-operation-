import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  

  const handleUsernameChange = event => {
    setEmployeeId(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleLoginFormSubmit = event => {
    event.preventDefault();
  
    axios.post('http://localhost:3000/auth/login', { employeeId, password })
      .then(response => {
        if (response.status === 200) {
          const { user, token } = response.data;
          const {name}=user
          localStorage.setItem('employeeId', (employeeId));
          localStorage.setItem('name', (name));
          localStorage.setItem('token', token);
          setMessage(response.data.message);
          alert("successfully logined")
          setTimeout(() => {
            window.location.href = '/projects';
          }, 3000);
        } else if (response.status === 401 || response.status === 404) {
          setMessage(response.data.message);
        }
      })
      .catch(error => {
        setMessage(
          error.response?.data?.message || "Something went wrong, please try again"
        );
      });
    setTimeout(() => {
      setMessage("");
    }, 1800);
  };
  
const handleClickSign =()=>{
    window.location.href =('/auth/signin')
}

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
         <button className="mr-[-190px] mt-[-260px] absolute bg-orange-400 rounded-xl hover:cursor-pointer" onClick={handleClickSign} >SignIn</button>
      <form className="bg-white rounded-lg p-14 shadow-lg" onSubmit={handleLoginFormSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            EmployeeID:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={employeeId}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {message && <div className="text-red-500 mb-4">{message}</div>}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 ml-14 rounded-xl focus:outline-none focus:shadow-outline hover:cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
