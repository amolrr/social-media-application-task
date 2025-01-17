import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/api/users");
            setUsers(response.data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {users.map((user) => (
                <div key={user.id}>
                    <p>Name: {user.name}</p>
                    <p>Social Media: {user.socialMediaHandle}</p>
                    <div>
                        {user.images.map((url) => (
                            <img src={url} alt="user-upload" key={url} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
