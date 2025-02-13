import Modal from "./Modal/Modal";
import React, {useState, useEffect} from "react";
import Button from "./Button/Button";
import axios from "axios";

export default function AddButtonControls({orders}) {
    const [modal, setModal] = useState(false);
    const [order, setOrder] = useState([])

    function openModel() {
        setModal(true)
    }

    // const sendData = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:8000/api/orders/', {
    //             order
    //         }, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         console.log('Response:', response.data);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };



    const sendData = async () => {

        const res = await fetch('http://localhost:8000/api/orders/')
        const ord = await res.json()
        console.log(ord)
        // setOrder(ord)




    }

     // useEffect(() =>{
     //        sendData()
     //
     //    }, [])

    return (
        <section>
            <Button onClick={openModel} style={{
                backgroundColor: '#30a61f',
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                marginBottom: '1rem'
            }}>
                Добавить заказ
            </Button>

            <Modal open={modal}>
                <h2>Hello form modal</h2>
                <p>Sample text</p>
                <Button onClick={() => sendData()}>test</Button>
                {/*<form>*/}
                {/*    <label>*/}
                {/*        № Заказа*/}
                {/*    </label>*/}
                {/*     {order.map((o)=> <>key={o.id} {o.name}</>)}*/}
                {/*    <input type="text" placeholder="Name" value={setOrder(order)}*/}
                {/*           onChange={(e) => setOrder(e.target.value)}/>*/}
                {/*    <button onClick={sendData}>Send Data</button>*/}
                {/*</form>*/}
                <Button onClick={() => setModal(false)}>Close modal</Button>
            </Modal>
        </section>
    )
}
