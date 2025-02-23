import React from 'react';
//import authService from '../../services/authService';

const Header = ({ user, onLogout, onLoginClick}) => {
    return (
        <header style={{
            backgroundColor: '#f8f9fa',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <div className="logo">GROSVER</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {user ? (
                    <>
                        <span style={{ marginRight: '15px' }}>
                            Пользователь: {user.username}
                        </span>
                        <button
                            onClick={onLogout}
                            style={{
                                padding: '5px 10px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Выйти
                        </button>
                    </>
                ) : (
                    <button
                        onClick={onLoginClick}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Войти в систему
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;