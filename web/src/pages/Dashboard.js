import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployeeInfo, getAllEmployees, deleteEmployee } from '../services/api';
import useRedirect from '../hooks/useRedirect';
import UserUpdate from '../components/userUpdate'
import CreateUser from '../components/createUser'

const Dashboard = () => {
    const [isLogout, setIsLogout] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenC, setIsModalOpenC] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');
    const [userDocument, setUserDocument] = useState('');
    const [error, setError] = useState('');

    const redirect = useRedirect();
    const navigate = useNavigate();

    const openModal = (userId) => {
        if(!userId){
            setIsModalOpenC(true);
        }else{
            setIsModalOpen(true);
        }
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUserId('');
    };
    
    const fetchUserData = async () => {
        try {

            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            const name = localStorage.getItem('name');
            const document = localStorage.getItem('document');
            setUserRole(role);
            setUserName(name);
            setUserDocument(document);
            if (role === 'administrador') {
                const response = await getAllEmployees(token);
                setEmployees(response);
            } else if (role === 'empleado') {
                const response = await getEmployeeInfo(token);
                setUserInfo(response);
            }
        } catch (err) {
            setError('Error fetching user data');
            console.error(err);
        }
    };

    const handleLogout = () => {
        setIsLogout(true);
        redirect('/login');
    };

    const handleDelete = async (event) => {
        const userId = event.currentTarget.getAttribute('data-user-id');
        const token = localStorage.getItem('token');
        await deleteEmployee(userId, token);
        navigate(0);
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className='dash-container'>
            <button className='logoutButton' onClick={handleLogout}>Logout</button>
            <button className='createButton' onClick={() => openModal()}>Crear Usuario</button>
            {error && <p>{error}</p>}
            {userRole === 'administrador' && (
                <>
                    <h1>Admin</h1>
                    <h2>Hola!  <label>{userName}</label></h2>
                    <div className='admin-container'>
                        <h4>Empleados</h4>
                        <ul>
                            {employees.map(employee => (
                                <li key={employee.user_id}>
                                    <div className='infoContent'>
                                        <p><label>User ID : </label> {employee.user_id}</p>
                                        <p><label>Salario : </label> {employee.salary}</p>
                                        <p><label>Descripcion : </label> {employee.description}</p>
                                        <button id='modify' data-user-id={employee.user_id}  onClick={() => openModal(employee.user_id)} >Modificar</button>
                                        <button id='delete' data-user-id={employee.user_id} onClick={handleDelete}>Eliminar</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
            {userRole === 'empleado' && userInfo && (
                <>
                    <h2>Hola!  <label>{userName}</label></h2><div className='Infoemployee'>
                        <p> Descripcion : <label> {userInfo.description}</label> </p>
                        <p>Name : <label> {userName}</label></p>
                        <p>Document: <label>{userDocument}</label></p>
                        <p>Role: <label> {userRole}</label></p>
                        <p>Salario: <label> {userInfo.salary}</label></p>
                    </div>
                </>
            )}
            <UserUpdate isOpen={isModalOpen} onClose={closeModal} userId={selectedUserId} />
            <CreateUser isOpen={isModalOpenC} onClose={closeModal} userId={selectedUserId} />
        </div>
    );
};

export default Dashboard;
