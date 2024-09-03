import React, { useEffect ,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateEmployee } from '../services/api';

const UserUpdate = ({ isOpen, onClose , userId }) => {
    const [formData, setFormData] = useState({
        user_id: userId,
        salary: '',
        description: ''
    });

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            user_id: userId
        }));
    }, [userId]);
    
    const navigate = useNavigate();
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        updateEmployee(formData ,token);
        onClose();
        navigate(0);
    };

    return (
        <div className="modal-overlay" >
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="chk" aria-hidden="true">
                        Actualizar Datos De usuario
                    </label>
                    <input
                        type="text"
                        name="salary"
                        placeholder="Salario"
                        value={formData.document}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="descripcion"
                        value={formData.document}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Actualizar</button>
                </form>
            </div>
        </div>
    );
};

export default UserUpdate;