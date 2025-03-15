import axios from "axios";
import React, { useEffect, useState } from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import Loader from "../Common/Loader";
import "./Tool.css";
import AuthService from "../../services/authService";

const EditTool = () => {
  const [tool, setTool] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getToolApi = "http://localhost:8000/api/tools/";

  useEffect(() => {
    getTool();
  }, [id]);  // Добавляем зависимость, чтобы запрос выполнялся только при изменении id

  const getTool = () => {
    axios
      .get(`${getToolApi}${id}/`)
      .then((response) => {
        setTool(response.data);
      })
      .catch((err) => {
        console.error("Ошибка загрузки инструмента:", err);
      });
  };

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setTool({ ...tool, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios.put(`${getToolApi}${id}/`, tool, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        console.log("Инструмент обновлен:", response.data);
        navigate("/api/tools/");
      })
      .catch((error) => {
      // Проверка, если ошибка - это объект с ключом detail
      const errorMessage = error.response?.data?.detail || error.message;
      setError(errorMessage);  // Устанавливаем строку ошибки
      setIsLoading(false);
    });
  };

  return (
    <div className="tool-form">
      <Link to={'/api/tools/'}>На главную</Link>
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Форма для редактирования</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="brand_tool" className="form-label">Бренд</label>
          <input
              type="text"
              className="form-control"
              id="brand_tool"
              name="brand_tool"
              value={tool.brand_tool || ''}
              onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type_tool" className="form-label">Тип инструмента</label>
          <input
              type="text"
              className="form-control"
              id="type_tool"
              name="type_tool"
              value={tool.type_tool || ''}
              onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="working_length_tool" className="form-label">Диаметр инструмента</label>
          <input
              type="text"
              className="form-control"
              id="diametr"
              name="diametr"
              value={tool.diametr || ''}
              onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="working_length_tool" className="form-label">Рабочая днина</label>
          <input
              type="text"
              className="form-control"
              id="working_length_tool"
              name="working_length_tool"
              value={tool.working_length_tool || ''}
              onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="length_tool" className="form-label">Длина инструмента</label>
          <input
              type="text"
              className="form-control"
              id="length_tool"
              name="length_tool"
              value={tool.length_tool || ''}
              onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">Сохранить изменения</button>
      </form>
    </div>
  );
};

export default EditTool;