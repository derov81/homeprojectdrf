import Modal from "./Modal/Modal";
import React, {useState} from "react";
import Button from "./Button/Button";

export default function FeedbackSection(){
     const [modal, setModal] = useState(false);

     function openModel(){
         setModal(true)
     }

    return(
        <section>
            <h3>Обратная связь</h3>

            <Button onClick={openModel}>Open modal</Button>

            <Modal open={modal}>
                <h2>Hello form modal</h2>
                <p>Sample text</p>
            </Modal>
        </section>
    )
}
