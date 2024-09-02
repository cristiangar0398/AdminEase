import express from 'express';
import registerController from '../../controllers/registerController.js';
import employeeController from '../../controllers/employeeController.js';
import AdminController from '../../controllers/AdminController.js';
import authenticate from '../../middleware/authenticateMiddleware.js'; 

const router = express.Router();
const register = new registerController();
const employee = new employeeController();
const admin = new AdminController();

router
    // Admin Controller 
    .post("/admin/createuser" , authenticate.authenticate, admin.createNewUser)
    .put("/admin/employee", authenticate.authenticate, admin.updateEmployee)
    .delete("/admin/employee", authenticate.authenticate, admin.deleteEmployee)
    .get("/admin/employees", authenticate.authenticate, admin.getAllEmployees)

    //Employee Controller 
    .get("/employee/info" , authenticate.authenticate , employee.getEmployeeInfo)

    //Register Controller
    .post("/login", register.Login)
    .post("/singup", register.SingUp);


export default router;