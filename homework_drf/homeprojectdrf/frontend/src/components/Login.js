import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

const Login = ({ onLoginSuccess, show, setShowLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Сброс формы при закрытии
    useEffect(() => {
        if (!show) {
            setUsername('');
            setPassword('');
            setEmail('');
            setError('');
            setIsLogin(true);
        }
    }, [show]);

    if (!show) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const data = await authService.login(username, password);
                onLoginSuccess(data);
            } else {
                if (!email) {
                    throw new Error('Пожалуйста, укажите email');
                }
                await authService.register(username, password, email);
                const loginData = await authService.login(username, password);
                onLoginSuccess(loginData);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error.response?.data?.detail || error.message || 'Произошла ошибка');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999
            }} onClick={() => setShowLogin(false)} />
            
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px',
                padding: '20px',
                backgroundColor: 'white',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                zIndex: 1000
            }}>
                <button
                    onClick={() => setShowLogin(false)}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '20px',
                        cursor: 'pointer',
                        padding: '5px 10px'
                    }}
                >
                    ✕
                </button>

                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {isLogin ? 'Вход в систему' : 'Регистрация'}
                </h2>
                
                {error && (
                    <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Имя пользователя:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginTop: '5px',
                                border: '1px solid #ddd',
                                borderRadius: '4px'
                            }}
                        />
                    </div>

                    {!isLogin && (
                        <div style={{ marginBottom: '15px' }}>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    marginTop: '5px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                    )}

                    <div style={{ marginBottom: '20px' }}>
                        <label>Пароль:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginTop: '5px',
                                border: '1px solid #ddd',
                                borderRadius: '4px'
                            }}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: loading ? '#ccc' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginBottom: '10px'
                        }}
                    >
                        {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
                    </button>

                    <div style={{ textAlign: 'center' }}>
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#007bff',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            {isLogin ? 'Создать новый аккаунт' : 'Уже есть аккаунт? Войти'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;