import React, { useState } from 'react';
import { login, signup } from '../services/api';
import useRedirect from '../hooks/useRedirect';
import SuccessNotification from '../components/SignUpSuccessful'

const LoginSignup = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        document: '',
        role: '',
        password: ''
    });
    const [error, setError] = useState('');
    const redirect = useRedirect();

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    const handleToggle = () => {
        setIsSignUp(!isSignUp);
        setFormData({
            document: '',
            password: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (!isSignUp) {
                await signup(formData);
                setNotificationMessage('Sign up successful');
            } else {
                response = await login(formData);
                const { token, role , name , document} = response; 
                localStorage.setItem('token', token);
                localStorage.setItem('role', role); 
                localStorage.setItem('name', name); 
                localStorage.setItem('document', document); 
                redirect('/dashboard');
            }
        } catch (err) {
            alert('error');
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <div className="login-container">
            <SuccessNotification
                message={notificationMessage}
                onClose={handleCloseNotification}
            />
            <input
                type="checkbox"
                id="chk"
                aria-hidden="true"
                checked={isSignUp}
                onChange={handleToggle}
            />
            <div className="signup">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="chk" aria-hidden="true">
                        Sign up
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="User name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="document"
                        placeholder="Document"
                        value={formData.document}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">{isSignUp ? 'Sign up' : 'Login'}</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="chk" aria-hidden="true">
                        Login
                    </label>
                    <input
                        type="text"
                        name="document"
                        placeholder="Document"
                        value={formData.document}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginSignup; 
