import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const ViewProjects = () => {
    const [project, setProject] = useState("")
    const [searchQuery, setSearchQuery] = useState("");
    const [message, setMessage] = useState("")
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("")
    const [code, setCode] = useState("");
    const [status, setStatus] = useState("");
    const [members, setMembers] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [attachements, setAttachements] = useState([]);
    const [logo, setLogo] = useState("");
    const [updatedBy, setUpdatedBy] = useState("");

    //get data with specific id or code
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchQuery) {
            setProject("")
            setTimeout(() => {
                setMessage("")
            }, 1600)
            setMessage("Please enter a project ID or code");
            return;
        }
        try {
            setProject("");
            const response = await axios.get(`http://localhost:3000/projects/${searchQuery}`);
            setProject(response.data);
            setMessage("");
            setName(response.data.name)
            setCode(response.data.code)
            setStatus(response.data.status)
            setMembers(response.data.members)
            setStartDate(response.data.startDate)
            setEndDate(response.data.endDate)

            setDescription(response.data.description)
            setAttachements(response.data.attachements)
            setLogo(response.data.logo)
            setUpdatedBy(response.data.updatedBy)

            if (response.status === 200) {
                setMessage(response.data.message);
            } else if (response.status === 404) {
                setMessage(response.data.error);
            }
        } catch (error) {
            setMessage(error.response.data.message);
        }
        setTimeout(() => {
            setMessage("");
        }, 1600);
    }
    //update data using put api
    const handleUpdate = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3000/projects/${searchQuery}`, { name, code, status, members, startDate, endDate, description, attachements, logo, updatedBy })
            .then(response => {
                console.log(response.data);
                setProject(response.data);
                if (response.status === 202) {
                    setMessage(response.data.message);
                    setTimeout(() => {
                        window.location.href = '/projects'
                    }, 1900);
                } else if (response.status === 404) {
                    setMessage(response.data.error);
                }
            })
            .catch(error => {
                setMessage(
                    error.response.data.message || "Something went wrong, please try again"
                );
            });
        setTimeout(() => {
            setMessage("");
        }, 1600);
    }

    //Delete method
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/projects/${searchQuery}`);
            console.log('response', response);
            setProject(response.data);
            if (response.status === 200) {
                setMessage(response.data.message);
                setTimeout(() => {
                    window.location.href = '/projects'
                }, 1900);
            } else if (response.status === 404) {
                setMessage(response.data.error);
            }
        } catch (error) {
            setMessage(error.response.data.message);
        }
        setTimeout(() => {
            setMessage("");
        }, 2000);
    }
    return (
        <div className='top-28 relative z-1'>
            <div>
            {!isEditing && (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your ProjectID or code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
            {message && <p>{message}</p>}
        </form>
    )}
            </div>
            <div>
                {project ? (
                    <div>
                        {isEditing ? (
                            <div className="p-6 z-1 relative  max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
                                <form onSubmit={handleUpdate}>
                                <button className="mb-4 " onClick={() => setIsEditing(false)}
                                        type="button">Go back</button>
                                    <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
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
                                                value={members.map((member) => member._id).join('\n')}
                                                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                                onChange={(e) => {
                                                    const ids = e.target.value.split('\n');
                                                    const members = ids.map((id) => ({ _id: id }));
                                                    setMembers(members);
                                                }} />
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
                                            onChange={(e) => setAttachements(e.target.value.split('\n'))}
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
                                            <label className="block font-medium text-gray-700">UpdatedBy:</label>
                                            <input
                                                type="text"
                                                value={updatedBy}
                                                onChange={(e) => setUpdatedBy(e.target.value)}
                                                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                            />
                                        </div>
                                    </div>
                                    <button className="bg-red-800 w-20 h-8 text-white" type='button' onClick={(e) => { e.preventDefault(); handleDelete();  }}>Delete</button>
                                   
                                    <button className="bg-blue-800 w-20 h-8  text-white ml-48" type="submit">Update</button>
                                    {message && <p>{message}</p>}
                                </form>
                            </div>
                        ) : (
                            <div className="bg-white shadow-lg rounded-lg p-6 mx-[300px]">
                                <div>
                                    <p className="text-xl font-bold text-gray-800">ProjectId: {project._id}</p>
                                    <p className="text-base text-gray-700">
                                        <strong className="text-gray-700">ProjectName:</strong> {project.name}
                                    </p>
                                    <div className="flex justify-between items-center mb-3">
                                        <p className="text-base text-gray-700">
                                            <strong className="text-gray-700">ProjectCode:</strong> {project.code}
                                        </p>
                                        <span className="text-sm text-gray-500">
                                            {moment(project.startDate).format("MMM D, YYYY")}
                                            {project.endDate && ` - ${moment(project.endDate).format("MMM D, YYYY")}`}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-base text-gray-700">
                                    <strong className="text-gray-700">Status:</strong> {project.status}
                                </p>

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
                                <button className='bg-blue-500 h-9 w-20 ml-[260px] mt-5 text-center hover:bg-orange-500 rounded-full' onClick={() => setIsEditing(true)}>Edit</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <p>Loading ... </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewProjects;




