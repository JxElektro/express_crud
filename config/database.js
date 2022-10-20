import { Sequelize } from "sequelize"; 

const db = new Sequelize(
    "Crud", // Nombre de Base De datos a la que apuntamos en Postgres
    "postgres", //Nombre de Usuario Postgres
    "alcap1990", { // Contraseña de Usuario Postgres
    host: "localhost", // Host de la base de datos en este caso es local
    dialect: 'postgres', // Tipo de base de datos
    logging: false,// Para que no muestre los logs de las consultas
    port: 5432, // Puerto de la base de datos en este caso es el 5432 por defecto de postgres
    define: {
        timestamps: false //** */
    }
});

export default db; // Exportamos la conexion para poder usarla en otros archivos