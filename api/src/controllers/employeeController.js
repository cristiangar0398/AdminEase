import EmployeeService from "../services/employeeService.js"

export default class employeeController {
    constructor() {
        this.getEmployeeInfo = this.getEmployeeInfo.bind(this)
    }

    async getEmployeeInfo(req, res) {
        try {
            const userId = req.user.userId;
            const employee = await EmployeeService.getEmployeeByUserId(userId);

            if (employee) {
                return res.status(200).json(employee);
            } else {
                return res.status(404).json({ message: 'Employee not found' });
            }
        } catch (error) {
            this.sendErrorResponse(res, error)
        }
    }

    sendErrorResponse(res, error) {
        res.status(500).json({ error: "There was an error processing the request" })
        console.error(error)
    }
}