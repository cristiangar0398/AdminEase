import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import Employee from "../models/employeeModel.js";

dotenv.config();

class UserService {
    async createUser(document, password, userID, role, name) {
        try {

            const hashCost = parseInt(process.env.HASH_COST, 10);
            if (isNaN(hashCost)) {
                throw new Error("Invalid HASH_COST environment variable");

            }

            const isRegistered = await this.documentIsRegister(document);
            if (isRegistered) {
                return { status: 200, message: "Already registered user" };
            }

            const hashedPassword = await bcrypt.hash(password, hashCost);
            const user = await User.create({
                id: userID,
                document,
                role,
                name,
                password: hashedPassword,
            });

            const employee = await Employee.create({
                user_id: user.id,
                salary: 0,
                description: "Pendiente de actualización",
            });

            return { status: 201, user, employee };

        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    async validateUser(document, password) {
        try {
            const user = await this.getUserByDocument(document);
            if (!user) {
                return { status: 401, message: "Invalid document or password" };
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return { status: 200, message: "Validation successful", user };
            } else {
                return { status: 401, message: "Invalid document or password" };
            }

        } catch (error) {
            console.error("Error al validar usuario:", error);
            throw error;
        }
    }

    async getUserByDocument(document) {
        return User.findOne({
            where: { document }
        });
    }

    async documentIsRegister(document) {
        const user = await User.findOne({
            where: { document }
        });
        return user !== null;
    }

}

export default new UserService();
