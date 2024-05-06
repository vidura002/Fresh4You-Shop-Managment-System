import React, { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('api/user/usersListing/');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.data); 
        console.log('Users fetched successfully:', data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

 
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.role && user.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  

  return (

    <div className="ml-24">
    <input

    <div className="p-10 mb-10">
    <input className="'bg-transparent focus:outline-none w-24 sm:w-64 w-5xl h-lg'"

        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <table className="text-left text-sm font-light border-collapse border border-slate-500 ...">

      <table className="text-left text-sm font-light border-collapse border border-slate-500 ... mt-10">

        <thead className="border-b font-medium dark:border-neutral-500" >
          <tr>
            <th className="border border-slate-600 ...">User Name</th>
            <th className="border border-slate-600 ...">Email</th>
            <th className="border border-slate-600 ...">Role</th>
            <th className="border border-slate-600 ..."></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td className="border border-slate-700 ...">{user.username}</td>
              <td className="border border-slate-700 ...">{user.email}</td>
              <td className="border border-slate-700 ...">{user.role}</td>

              <td className="border border-slate-700 ...">{user.role}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
