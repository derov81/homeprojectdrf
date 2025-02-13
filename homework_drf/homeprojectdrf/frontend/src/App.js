import './App.css';
import Header from "./components/Header/Header";
import OrdersAndParts from "./OrdersAndParts";
import {useState} from "react";
import TabsSection from "./components/TabsSection";
import FeedbackSection from "./components/FeedbackSection";


const App = () => {

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [tab, setTab] = useState('main')

    return (
        <>
            <Header/>
            <main  style={{marginLeft: '1rem'}}>
                <TabsSection active={tab} onChange={(current) => setTab(current)}/>
                {tab === 'main' && (
                    <>
                        {!selectedOrder && (
                            <OrdersAndParts onSelect={(orderId) => setSelectedOrder(orderId)}/>
                        )}
                    </>
                )}

                {tab === 'feedback' && <FeedbackSection/>}
            </main>
        </>
    );
};

export default App;
