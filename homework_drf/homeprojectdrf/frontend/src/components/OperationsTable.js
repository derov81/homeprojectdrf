import React from "react";
import Controls from "./Controls";

const OperationsTable = ({operations, selectedDetail, selectedOperation, onSelectOperation, onDelete, onEdit, onAdd}) => (
    <div>
        <h2>Операции</h2>
        <button onClick={onAdd}>Добавить операцию</button>
        {selectedDetail ? (
            <table border="1" cellPadding="10" style={{width: "300px"}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {operations.map((oper) => (
                    <tr
                        key={oper.id}
                        onClick={() => onSelectOperation(oper.id)}
                        style={{
                            cursor: "pointer",
                            backgroundColor: selectedOperation === oper.id ? "#eef" : "",
                        }}
                    >
                        <td>
                            <>
                                <div style={{textAlign: "center"}}>Ид операции: {oper.id}</div>
                                <div style={{textAlign: "center"}}>№ Операции: {oper.name}</div>
                            </>
                        </td>
                        <td><Controls onDelete={() => onDelete(oper.id)}
                                      onEdit={() => onEdit(oper)}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        ) : (
            <p>Please select a detail to view its operations.</p>
        )}
    </div>
);

export default OperationsTable;