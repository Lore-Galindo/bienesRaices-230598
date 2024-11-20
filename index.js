import express from 'express'
import generalRoutes from './routes/generalRoutes.js'
import userRoutes from './routes/userRoutes.js';
import db from './db/config.js'
import dotenv from 'dotenv'


//Crear la APP
const app = express()

//conexion con la base de datos
try {
    
    await db.authenticate();
    db.sync();
    console.log('conexión correcta a la base de datos')
}catch (error){
    console.log(error)
}

//Habilitar pug
app.set('view engine','pug')
app.set ('views', './views')

//Ejemplo de activacion de HOT RELOAD
//console.log("Hola desde NodeJS, esto esta en hot reload")

//const express = require(`express`) //  Usando CommonJS
//  Importar la libreria para crear un servidor web - CommonJS / ECMA Script 6
//  Instanciar nuestra aplicacion web

app.use(express.static('./public'));

//Conexion a la BD
try{
    await db.authenticate();
    db.sync();
    console.log("Conexion exitosa ala base de datos")

}
catch(error)
{
     console.log(error)
}
//Habilitar la lectura de datosb desde formuilario
app.use(express.urlencoded({extended:true}))

// configuramos nuestro servidor web
const port = process.env.BACKEND_PORT;
app.listen(port, () =>{
    console.log(`La aplicacion ha iniciado en el puerto: ${port}`);
})


// Routing - Enrutacion para peticiones
app.use("/",generalRoutes);
app.use("/auth/", userRoutes);