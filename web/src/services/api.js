
const handleErrors = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
};


export const createUser = async (userData, token) => {
    try {
        const response = await fetch('http://localhost:5050/api/v1/admin/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });
        return await handleErrors(response);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


export const updateEmployee = async (employeeData, token) => {
    try {
        const response = await fetch('http://localhost:5050/api/v1/admin/employee', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(employeeData),
        });
        return await handleErrors(response);
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};


export const deleteEmployee = async (employeeId, token) => {
    try {
        const response = await fetch('http://localhost:5050/api/v1/admin/employee', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ user_id: employeeId }),
        });
        return await handleErrors(response);
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};


export const getAllEmployees = async (token) => {
    try {
        const response = await fetch('http://localhost:5050/api/v1/admin/employees', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return await handleErrors(response);
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};


export const getEmployeeInfo = async (token) => {
    try {
        const response = await fetch('http://localhost:5050/api/v1/employee/info', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return await handleErrors(response);
    } catch (error) {
        console.error('Error fetching employee info:', error);
        throw error;
    }
};


export const login = async (credentials) => {
    try {
        const response = await fetch('http://localhost:5050/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return await handleErrors(response);
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};


export const signup = async (userData) => {
    try {
        const response = await fetch('http://localhost:5050/api/v1/singup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return await handleErrors(response);
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};
