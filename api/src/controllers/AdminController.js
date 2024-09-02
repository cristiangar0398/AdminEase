import EmployeeService from '../services/employeeService.js';
import UserService from '../services/userService.js';

export default class AdminController {
    constructor() {
        this.createNewUser = this.createNewUser.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.getAllEmployees = this.getAllEmployees.bind(this);
    }

    async createNewUser (req, res){
        try {
            const { document, password, role, name } = req.body;
            if (!document || !password) {
              return res.status(400).json({ error: 'Invalid request payload' });
            }
      
            const userID = Math.floor(Math.random() * 1000000).toString();
            const result = await UserService.createUser(document, password, userID, role, name);
      
            if (result.status === 200) {
              return res.status(200).json({ message: result.message });
            }
      
            if (result.status === 201) {
              return res.status(201).json({
                id: result.user.id,
                document: result.user.document,
                role: result.user.role,
                message: result.message
              });
            }
      
          } catch (error) {
            this.sendErrorResponse(res)
          }
    }

    async updateEmployee(req, res) {
        try {
            const { document } = req.body;
            const { salary, description } = req.body;

            if (!document) {
                return res.status(400).json({ error: 'Invalid request payload' });
            }

            const user = await EmployeeService.getEmployeeByDocument(document);
            const result = await EmployeeService.updateEmployee(user.id, { salary, description });

            console.log("====> user :" , user.id)

            if (result) {
                return res.status(200).json({ message: 'Employee updated successfully' });
            } else {
                return res.status(404).json({ message: 'Employee not found' });
            }

        } catch (error) {
            this.sendErrorResponse(res, error);
        }
    }

    async deleteEmployee(req, res) {
        try {
            const { document } = req.body;

            const user = await EmployeeService.getEmployeeByDocument(document);
            const result = await EmployeeService.deleteEmployee(user.id);

            if (result) {
                return res.status(200).json({ message: 'Employee deleted successfully' });
            } else {
                return res.status(404).json({ message: 'Employee not found' });
            }

        } catch (error) {
            this.sendErrorResponse(res, error);
        }
    }

    async getAllEmployees(req, res) {
        try {
            const employees = await EmployeeService.getAllEmployees();

            if (employees.length > 0) {
                return res.status(200).json(employees);
            } else {
                return res.status(404).json({ message: 'No employees found' });
            }

        } catch (error) {
            this.sendErrorResponse(res, error);
        }
    }

    sendErrorResponse(res, error) {
        res.status(500).json({ error: 'There was an error processing the request' });
        console.error(error);
    }
}