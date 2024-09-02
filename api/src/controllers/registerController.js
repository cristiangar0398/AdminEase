import UserService from '../services/userService.js'
import jwt from 'jsonwebtoken';

export default class registerController {
  constructor() {
    this.SingUp = this.SingUp.bind(this)
    this.Login = this.Login.bind(this)
  }

  async SingUp(req, res) {
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

  async Login(req, res) {
    try {
      const { document, password } = req.body;
      if (!document || !password) {
        return res.status(400).json({ error: 'Invalid request payload' });
      }
      const result = await UserService.validateUser(document, password);
      if (result.status === 200) {
        const token = jwt.sign(
          { userId: result.user.id, role: result.user.role }, 
          process.env.JWT_SECRET, 
          { expiresIn: '1h' } 
        );
        return res.status(200).json({ message: result.message , token: token });
      }

      if (result.status === 401) {
        return res.status(401).json({ message: result.message });
      }

    } catch (error) {
      this.sendErrorResponse(res , error)
    }
  }

  sendErrorResponse(res , error) {
    res.status(500).json({ error: "There was an error processing the request" })
    console.error(error)
  }
}


