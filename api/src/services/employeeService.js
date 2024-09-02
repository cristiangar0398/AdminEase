import Employee from "../models/employeeModel.js";
import User from '../models/userModel.js';

class EmployeeService {
    async getEmployeeByUserId(userId) {
        try {
            const employee = await Employee.findOne({
                where: { user_id: userId }
            });
            return employee;
        } catch (error) {
            console.error("Error obtaining employee information:", error);
            throw error;
        }
    }

    async getEmployeeByDocument(document) {
        try {
            return User.findOne({
                where: { document }
            });
        } catch (error) {
            console.error("Error obtaining employee information:", error);
            throw error;
        }
    }

    async updateEmployee(employeeId, updates) {
        try {
            const [affectedRows] = await Employee.update(updates, {
                where: { user_id: employeeId }
            });
            return affectedRows > 0;
        } catch (error) {
            console.error("Error updating employee:", error);
            throw error;
        }
    }

    async deleteEmployee(employeeId) {
        try {
            const result = await Employee.destroy({
                where: { user_id: employeeId }
            });
            return result > 0;
        } catch (error) {
            console.error("Error deleting employee:", error);
            throw error;
        }
    }

    async getAllEmployees() {
        try {
            const employees = await Employee.findAll();
            return employees;
        } catch (error) {
            console.error("Error retrieving employees:", error);
            throw error;
        }
    }

}

export default new EmployeeService();