import React, {useState, useEffect} from 'react';
import Header from './components/Header/Header';
import Login from './components/Login';
import authService from './services/authService';
import TabsSection from "./components/TabsSection";
import OrdersAndParts from "./OrdersAndParts";
import FeedbackSection from "./components/FeedbackSection";

const App = () => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [tab, setTab] = useState('main');

    useEffect(() => {
        // При загрузке страницы проверяем наличие пользователя
        const savedUser = authService.getCurrentUser();
        if (savedUser) {
            setUser(savedUser);
            setShowLogin(false); // Явно скрываем форму, если пользователь авторизован
        }
    }, []);

    const handleLoginSuccess = (userData) => {
        console.log('Успешный вход:', userData);
        setUser(userData);
        setShowLogin(false);
    };

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        setShowLogin(false); // Скрываем форму при выходе
    };

    const handleLoginClick = () => {
        console.log('Открытие формы входа');
        setShowLogin(true);
    };

    return (
        <div>
           <Header 
                user={user} 
                onLogout={handleLogout}
                onLoginClick={handleLoginClick}
            />
            <Login 
                show={showLogin} 
                onLoginSuccess={handleLoginSuccess}
                setShowLogin={setShowLogin}
            />


                <main style={{marginLeft: '1rem'}}>
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
        </div>
    );
};

export default App;
