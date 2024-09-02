import 'dotenv/config'; 
import express from 'express'; 
import singUP from './v1/routes/index.js'; 
import sequelize from './database/index.js';

const app = express();

app.use(express.json());
app.use('/api/v1', singUP);

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos');
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (err) {
    console.error('Error iniciando el servidor:', err);
  }
};

startServer();