import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetchUsers() {
      const response = await fetch("https://social-media-application-task-backend.onrender.com/api/v1/allData");
      const data = await response.json();
      setUsers(data.users);
    }

    fetchUsers();
    setLoading(false);
  });

  return (
    <div className="p-4">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center z-10">
          <Spinner />
        </div>
      )}
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      { users.length > 0 ? (
        users.map((user) => (
          <div key={user._id} className="border border-gray-300 p-4 mb-4 rounded-lg flex flex-col">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-600">
            
              <a
                href={user.socialMediaHandle}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {user.socialMediaHandle}
              </a>
              </p>
            <div className="mt-2 flex flex-wrap">
              {user.images.map((image, index) => (
                <div key={index} className="m-2">
                  <img src={image} alt={`ImageNo ${index + 1}`} width="100" className="rounded" />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default AdminDashboard;
