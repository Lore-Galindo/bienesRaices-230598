import express from 'express'
import generalRoutes from './routes/generalRoutes.js'
import userRoutes from './routes/userRoutes.js';


//Crear la APP

const app = express()
//Habilitar pug
app.set('view engine','pug')
app.set ('views', './views')

//Ejemplo de activacion de HOT RELOAD
//console.log("Hola desde NodeJS, esto esta en hot reload")

//const express = require(`express`) //  Usando CommonJS
//  Importar la libreria para crear un servidor web - CommonJS / ECMA Script 6
//  Instanciar nuestra aplicacion web

app.use(express.static('./public'));

const port = 3000
app.listen(port, () =>
    console.log(`La aplicacion ha iniciado en el puerto: ${port}`))


// Routing - Enrutacion para peticiones
app.use("/",generalRoutes);
app.use("/auth/", userRoutes);