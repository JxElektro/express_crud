import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  logging: false,// Para que no muestre los logs de las consultas (opcional) muy largo en bash
  port: process.env.DB_PORT, // Puerto de la base de datos en este caso es el 5432 por defecto de postgres
  define: {
      timestamps: false // Para que no se cree la columna createdAt y updatedAt creadas por defecto por sequelize
  }
});



export default db; // Exportamos la conexion para poder usarla en otros archivos .