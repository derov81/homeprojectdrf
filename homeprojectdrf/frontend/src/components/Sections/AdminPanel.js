import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Modal/Modal.css";
import ReplyModal from "./ReplyModal"; // Подключаем компонент

export default function AdminPanel() {
    const API_URL = "http://127.0.0.1:8000/api/users/";
    const API_URL_FEEDBACK = "http://127.0.0.1:8000/api/feedback/";

    const [users, setUsers] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [replyFile, setReplyFile] = useState(null);

    useEffect(() => {
        fetchUsers();
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(API_URL_FEEDBACK, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFeedbacks(response.data);
        } catch (error) {
            console.error("Error fetching feedback", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    const deleteFeedback = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_URL_FEEDBACK}${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchFeedback();
        } catch (error) {
            console.error("Ошибка удаления сообщения", error);
        }
    };

    const openReplyModal = (feedback) => {
        setSelectedFeedback(feedback);
        setShowModal(true);
    };

    const handleReplySend = async () => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("reply_message", replyText);
        if (replyFile) {
            formData.append("reply_attachment", replyFile);
        }
        formData.append("status", "answered");

        try {
            await axios.patch(`${API_URL_FEEDBACK}${selectedFeedback.id}/`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowModal(false);
            setReplyText("");
            setReplyFile(null);
            fetchFeedback();
        } catch (err) {
            console.error("Ошибка при отправке ответа", err);
        }
    };

    return (
        <section>
            <h3>Административная панель</h3>
            <table className="table table-striped">
                <thead>
                    <tr><th>ID</th><th>Username</th><th>Email</th><th></th></tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td><button onClick={() => deleteUser(user.id)}>Удалить</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="container mt-5">
                <h2>Входящие заявки</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Сообщение</th>
                            <th>Ответ</th>
                            <th>Файл</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map(feedback => (
                            <tr key={feedback.id}>
                                <td>{feedback.name}</td>
                                <td>{feedback.email}</td>
                                <td>{feedback.message}</td>
                                <td>{feedback.reply_message || '—'}</td>
                                <td>
                                    {feedback.attachment ? (
                                        <a href={feedback.attachment} target="_blank" rel="noopener noreferrer">
                                            {feedback.attachment.split("/").pop()}
                                        </a>
                                    ) : '—'}
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => openReplyModal(feedback)}>Ответить</button>
                                    <button className="btn btn-sm btn-outline-danger"
                                        onClick={() => deleteFeedback(feedback.id)}>Удалить</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ReplyModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSend={handleReplySend}
                replyText={replyText}
                setReplyText={setReplyText}
                setReplyFile={setReplyFile}
            />
        </section>
    );
}
