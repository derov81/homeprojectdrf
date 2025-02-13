import React, {useEffect, useState} from "react";
import axios from "axios";
import OrdersTable from "./components/OrdersTable";
import PartsTable from "./components/PartsTable";
import OperationsTable from "./components/OperationsTable";
import ToolsTable from "./components/ToolsTable";

//import Modal from "./components/Modal/Modal";
//import Header from "./components/Header/Header";


export const OrdersAndParts = () => {
    const [orders, setOrders] = useState([]);
    const [parts, setParts] = useState([]);
    const [operations, setOperations] = useState([]);
    const [tools, setTools] = useState([]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [selectedOperation, setSelectedOperation] = useState(null);
    //const [visible, setVisible] = useState(true);



    useEffect(() => {
        axios.get("http://localhost:8000/api/orders/").then((res) => setOrders(res.data));
        axios.get("http://localhost:8000/api/details/").then((res) => setParts(res.data));
        axios.get("http://localhost:8000/api/operations/").then((res) => setOperations(res.data));
        axios.get("http://localhost:8000/api/tools/").then((res) => setTools(res.data));
    }, []);

    const handleEdit = (item, type) => {
        const newName = prompt(`Edit ${type} name:`, item.name || item.brand_tool);
        if (newName) {
            axios.put(`http://localhost:8000/api/${type}/${item.id}/`, {...item, name: newName}).then((res) => {
                if (type === "orders") setOrders((prev) => prev.map((o) => (o.id === res.data.id ? res.data : o)));
                if (type === "details") setParts((prev) => prev.map((p) => (p.id === res.data.id ? res.data : p)));
                if (type === "operations") setOperations((prev) => prev.map((op) => (op.id === res.data.id ? res.data : op)));
                if (type === "tools") setTools((prev) => prev.map((t) => (t.id === res.data.id ? res.data : t)));
            });
        }
    };




    const handleAdd = (type) => {
        const newItemName = prompt(`Enter new ${type} name:`);
        if (newItemName) {
            const newItem = {name: newItemName};
            axios.post(`http://localhost:8000/api/${type}/`, newItem).then((res) => {
                if (type === "orders") setOrders((prev) => [...prev, res.data]);
                if (type === "details") setParts((prev) => [...prev, res.data]);
                if (type === "operations") setOperations((prev) => [...prev, res.data]);
                if (type === "tools") setTools((prev) => [...prev, res.data]);
            });
        }
    };

    const handleDelete = (id, type) => {
        axios.delete(`http://localhost:8000/api/${type}/${id}/`).then(() => {
            if (type === "orders") setOrders((prev) => prev.filter((item) => item.id !== id));
            if (type === "details") setParts((prev) => prev.filter((item) => item.id !== id));
            if (type === "operations") setOperations((prev) => prev.filter((item) => item.id !== id));
            if (type === "tools") setTools((prev) => prev.filter((item) => item.id !== id));
        });
    };


    // const filteredParts = selectedOrder ? parts.filter((part) => part.order_id === selectedOrder) : [];
    // const filteredOperations = selectedDetail ? operations.filter((oper) => oper.detail_id === selectedDetail) : [];
    // const filteredTools = selectedOperation ? tools.filter((tool) => tool.operation_id === selectedOperation) : [];

    return (
        <>
            <div style={{display: "flex", gap: "20px"}}>

                <OrdersTable
                    orders={orders}
                    selectedOrder={selectedOrder}
                    onSelectOrder={setSelectedOrder}
                    onDelete={(id) => handleDelete(id, "orders")}
                    onEdit={(item) => handleEdit(item, "orders")}
                    //onAddTest={(item) => AddButtonControls.openM}
                    onAdd={() => handleAdd("orders")}
                />
                <PartsTable
                    parts={parts.filter((part) => part.order_id === selectedOrder)}
                    selectedOrder={selectedOrder}
                    selectedDetail={selectedDetail}
                    onSelectDetail={setSelectedDetail}
                    onDelete={(id) => handleDelete(id, "details")}
                    onEdit={(item) => handleEdit(item, "details")}
                    onAdd={() => handleAdd("details")}
                />
                <OperationsTable
                    operations={operations.filter((op) => op.detail_id === selectedDetail)}
                    selectedDetail={selectedDetail}
                    selectedOperation={selectedOperation}
                    onSelectOperation={setSelectedOperation}
                    onDelete={(id) => handleDelete(id, "operations")}
                    onEdit={(item) => handleEdit(item, "operations")}
                    onAdd={() => handleAdd("operations")}
                />
                <ToolsTable
                    tools={tools.filter((tool) => tool.operation_id === selectedOperation)}
                    selectedOperation={selectedOperation}
                    onDelete={(id) => handleDelete(id, "tools")}
                    onEdit={(item) => handleEdit(item, "tools")}
                    onAdd={() => handleAdd("tools")}
                />
            </div>
        </>
    );
};

export default OrdersAndParts;