import { Sequelize } from "sequelize";
// import connection 
import db from "../config/database.js";

// init DataTypes para asignarle los tipos a nuestra base de datos
const { DataTypes } = Sequelize;

const School = db.define('school', {

  id: {
    type: DataTypes.INTEGER, //(asignarle el valor a la base de datos)
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'school'
});

// Export model School
export default School;