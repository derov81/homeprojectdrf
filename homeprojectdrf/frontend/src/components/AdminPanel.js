import React, {useEffect, useState} from "react";
import axios from "axios";


export default function AdminPanel() {

    const API_URL = "http://127.0.0.1:8000/api/users/";
    const API_URL_FEEDBACK = "http://127.0.0.1:8000/api/feedback/";
    const [users, setUsers] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
         const token = localStorage.getItem('token');
            const response = await  axios.get(API_URL_FEEDBACK, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFeedbacks(response.data);
    };

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(API_URL, {
                headers: {
                     'Authorization':`Bearer ${token}`
                }
                });

            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };


    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}${id}/`, {
                headers: {
                     'Authorization':`Bearer ${token}`
                }
                });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };


    return (
        <section>
            <h3>Административная панель</h3>
            <table border="1">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (

                    < tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className='container mt-5'>
                <h2>Входящие заявки</h2>
                <table className='table table-bordered'>
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Сообщение</th>
                        <th>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) =>(
                            <tr key={feedback.id}>
                                <td>{feedback.name}</td>
                                <td>{feedback.email}</td>
                                <td>{feedback.message}</td>
                                <td>{feedback.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </section>
    )
}