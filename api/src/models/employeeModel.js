import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';  

const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: false
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'employees',
    timestamps: false
  });
  
  export default Employee;