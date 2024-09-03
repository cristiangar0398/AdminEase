import React, { useEffect ,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api';

const CreateUser = ({ isOpen, onClose  }) => {
    const [formData, setFormData] = useState({
        name: '',
        document: '',
        role: '',
        password: ''
    });
    
    const navigate = useNavigate();
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        createUser(formData ,token);
        onClose();
        navigate(0);
    };

    return (
        <div className="modal-overlay" >
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="chk" aria-hidden="true">
                        Crear Usuario
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
                    <button type="submit">Crear</button>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;