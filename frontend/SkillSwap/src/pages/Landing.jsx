import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.welcomeMessage}>Welcome to SkillSwap!</h1>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={() => handleNavigation('/home')}>
                    Go to Profile
                </button>
                <button style={styles.button} onClick={() => handleNavigation('/chat')}>
                    Chat
                </button>
                <button style={styles.button} onClick={() => handleNavigation('/video-call')}>
                    Video Call
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    welcomeMessage: {
        fontSize: '2rem',
        marginBottom: '2rem',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    button: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default Landing;
