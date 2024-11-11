
import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const db = new Sequelize(process.env.BD_NOMBRE,process.env.BD_USER, process.env.BD_PASSWORD /*?? ''*/,{//*bienesraices_node_mvc'1234' - 'bienes_raices_230598', 'Lorena.Galindo','1234'
    host: process.env.BD_DOMAIN, 
    port: process.env.DB_PORT, 
    dialect: 'mysql',
    define: {
        timestamp: true
    },
    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    
    } ,
    operatorAliases: false 
})

export default db;