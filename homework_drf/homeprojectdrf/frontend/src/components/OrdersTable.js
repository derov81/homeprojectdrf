import Controls from "./Controls";
import AddButtonControls from "./AddButtonControls";



const OrdersTable = ({orders, selectedOrder, onSelectOrder, onDelete, onEdit, onAddTest}) => (
    <div>
        <h2>Заказы</h2>
         <AddButtonControls orders={orders} />
        <table border="1" cellPadding="5" style={{width: "300px"}}>
            <tbody>
            {orders.map((order) => (
                <tr
                    key={order.id}
                    onClick={() => onSelectOrder(order.id)}
                    style={{
                        cursor: "pointer",
                        backgroundColor: selectedOrder === order.id ? "#eef" : "",
                    }}
                >
                    <td>
                        <>
                            <div style={{textAlign: "center"}}>Ид заказа: {order.id}</div>
                            <div style={{textAlign: "center"}}>№ Заказа: {order.name}</div>
                        </>
                    </td>
                    <td><Controls onDelete={() => onDelete(order.id)}
                                  onEdit={() => onEdit(order)}
                    /></td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default OrdersTable;