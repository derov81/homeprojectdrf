import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import "./Tool.css";
import {Image} from "react-bootstrap";

const Tool = () => {
  const [tool, setTool] = useState([]);
  const { id } = useParams();
  const getToolApi = "http://localhost:8000/api/tools/";

  useEffect(() => {
    getTool();
  }, []);

  const getTool = () => {
    axios
      .get(`${getToolApi}${id}/`)
      .then((item) => {
        setTool(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (

    <div className="tool mt-5">
        <Link to={'/'}>На главную</Link>
      <div className="tool">
        <h2 className="tool h2">{tool.type_tool} {tool.brand_tool}</h2>
          <p className="tool img">{<Image src={tool.image_url}/>}</p>
          <p>{tool.description}</p>
      </div>

      {/*<table className="table table-bordered">*/}
      {/*    <thead>*/}
      {/*    <tr>*/}
      {/*        <th>Бренд</th>*/}
      {/*        <th>Тип инструмента</th>*/}
      {/*        <th>Рабочая длина</th>*/}
      {/*        <th>Общая длина</th>*/}
      {/*    </tr>*/}
      {/*    </thead>*/}
      {/*    <tbody>*/}
      {/*    <tr>*/}
      {/*        <td>{tool.brand_tool}</td>*/}
      {/*        <td>{tool.type_tool}</td>*/}
      {/*        <td>{tool.working_length_tool}</td>*/}
      {/*        <td>{tool.length_tool}</td>*/}
      {/*        <td>{<Image src={tool.image_url}/>}</td>*/}
      {/*    </tr>*/}

      {/*    </tbody>*/}
      {/*</table>*/}
    </div>
  );
};
export default Tool;