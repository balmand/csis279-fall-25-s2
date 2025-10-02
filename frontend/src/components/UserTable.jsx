import axios from "axios";
import { useEffect, useState } from "react";

const UserTable = () => {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        retrieveUsers();
    }, []);

    const retrieveUsers = async () => {
        try {
            const usersURL = "http://localhost:4000/users";
            const response = await axios.get(usersURL);
            if (response.status === 200) {
                setUsers(response.data);
            }
        } catch (e) {
            alert("error retrieving user data " + e.message);
        }
    }
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user)=>{
                            return(
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default UserTable;