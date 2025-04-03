import { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/feedback/";

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        status: "",
        attachment: null,
    });

    const [statusMessage, setStatusMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, attachment: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("message", formData.message);
        formDataToSend.append("status", formData.status);
        if (formData.attachment) {
            formDataToSend.append("attachment", formData.attachment);
        }

        try {
            const response = await axios.post(API_URL, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Исправленный синтаксис
                },
            });

            console.log("Ответ сервера:", response.data); // Проверяем ответ API

            setFormData({ name: "", email: "", message: "", status: "", attachment: null });
            setStatusMessage("Ваш запрос успешно отправлен!");
        } catch (error) {
            console.error("Ошибка:", error.response ? error.response.data : error);
            setStatusMessage("Ошибка при отправке. Попробуйте снова.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Обратная связь</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Имя *</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Сообщение *</label>
                    <textarea
                        className="form-control"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Статус</label>
                    <input
                        type="text"
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Прикрепить файл</label>
                    <input type="file" className="form-control" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-primary">
                    Отправить
                </button>
            </form>
            {statusMessage && <div className="alert alert-info mt-3">{statusMessage}</div>}
        </div>
    );
};

export default FeedbackForm;
