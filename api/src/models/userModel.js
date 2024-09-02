// models/userModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';  // Asegúrate de importar tu instancia de Sequelize

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING(32),
    primaryKey: true,
    allowNull: false,
  },
  document: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at', 
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  timestamps: false,  
});

export default User;
