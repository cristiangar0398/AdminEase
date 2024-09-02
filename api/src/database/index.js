import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: false, 
  },
});

try {
  await sequelize.authenticate();
  console.log('Conexión exitosa');
} catch (err) {
  console.error('No se pudo conectar a la base de datos:', err);
}

export default sequelize;
