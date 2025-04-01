import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Loader from "../Common/Loader";
import AuthService from "../../services/authService";
import './Tool.css'
import {Image} from "react-bootstrap";



export default function ShowTool() {
    const API_URL = "http://127.0.0.1:8000/api/tools/";
    const [tools, setTools] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filteredTools, setFilteredTools] = useState([]); // Отфильтрованные данные
    const [searchTerm, setSearchTerm] = useState(""); // Поле ввода поиска
    const [currentPage, setCurrentPage] = useState(1);
    const toolsPerPage = 10;

    const user = AuthService.getCurrentUser()

    const handleDelete = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот инструмент?')) {
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setTools(prevTools => prevTools.filter(tool => tool.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении:', error);
            setError(error.response?.data?.detail || 'Ошибка при удалении инструмента');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTools = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTools(response.data);
            setFilteredTools(response.data); // Изначально отображаем все инструменты

        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            setError(error.response?.data?.detail || 'Ошибка при загрузке инструментов');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTools();
    }, []);

    // Фильтрация инструментов при изменении searchTerm
    useEffect(() => {
    const filtered = tools.filter(tool =>
        tool.brand_tool.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTools(filtered);
    if (currentPage > Math.ceil(filtered.length / toolsPerPage)) {
        setCurrentPage(1); // Сбрасываем только если текущая страница больше, чем доступные страницы
    }
}, [searchTerm, tools]);

    const indexOfLastTool = currentPage * toolsPerPage;
    const indexOfFirstTool = indexOfLastTool - toolsPerPage;
    const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool);

    const totalPages = Math.ceil(filteredTools.length / toolsPerPage);
    const nextPage = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    const prevPage = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));

    if (isLoading) {
        return <Loader/>;
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }

    if (!tools.length) {
        return (
            <div className="alert alert-info">
                Инструменты не найдены
                <br/>
                {user && (
                    <Link to={'api/tools/create/'}>Добавить инструмент</Link>
                )
                }
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between mb-3">

                <h2>Список инструментов</h2>

                {user && (
                    <Link to={'api/tools/create/'}>Добавить инструмент</Link>
                )
                }

            </div>

            {/* Поле ввода для поиска */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Поиск по наименованию..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {isLoading && <Loader/>}

            <table className="table table-striped table-hover">
                <thead className="table-dark">
                <tr>
                    <th>№</th>
                    <th>Фото</th>
                    <th>Наименования инструмента</th>
                    <th>Тип</th>
                    {/*<th>Рабочая длина</th>*/}
                    {/*<th>Общая длина</th>*/}
                    {/*<th>Материал обработки</th>*/}
                    {/*<th>Материал инструмента</th>*/}
                    {/*<th>Краткое описание</th>*/}
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>

                {currentTools.map((tool, index) => (
                    <tr key={tool.id}>
                        <td>{indexOfFirstTool + index + 1}</td>
                        <td>{<Image src={tool.image_url} width={38} height={38}/>}</td>
                        <td>{tool.brand_tool}</td>
                        <td>{tool.type_tool}</td>
                        {/*<td>{tool.working_length_tool}</td>*/}
                        {/*<td>{tool.length_tool}</td>*/}
                        {/*<td>{tool.material_of_detail}</td>*/}
                        {/*<td>{tool.material_of_tool}</td>*/}
                        {/*<td>{tool.short_description}</td>*/}
                        <td>
                            <div className="btn-group" role="group">

                                {user && (
                                    <Link
                                        to={`api/tools/${tool.id}`}
                                        className="btn btn-sm btn-outline-primary"
                                    >
                                        <i className="fa fa-pencil"></i>
                                    </Link>
                                )}

                                <Link
                                    to={`api/tools/show/${tool.id}`}
                                    className="btn btn-sm btn-outline-info"
                                >
                                    <i className="fa fa-eye"></i>
                                </Link>

                                {user &&

                                    (<button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(tool.id)}
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>)
                                }
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px"}}>
                <button className="page-link" onClick={prevPage} disabled={currentPage === 1}>Назад</button>
                {Array.from({length: totalPages}, (_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)}
                            className={`page-link ${currentPage === i + 1 ? 'active' : ''}`}>
                        {i + 1}
                    </button>
                ))}
                <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>Вперед</button>
            </div>
        </div>

    );
};

