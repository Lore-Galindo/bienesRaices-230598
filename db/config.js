import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_DOMAIN,
    port: process.env.BD_PORT,
    dialect: 'mysql',
    timezone:'-06:00',
    define: {
        timestamps: true, // Permite agregar dos campos de registro
    },
    pool: {
        max: 5, // Máximo de conexiones en el pool
        min: 0,
        acquire: 30000, // Tiempo máximo que una conexión puede estar inactiva
        idle: 10000, // Tiempo máximo que una conexión puede estar inactiva antes de ser cerrada
    }
});

export default db;