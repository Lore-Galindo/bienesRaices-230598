//import { request, response } from "express"
import Users from "../models/Users.js"

const formularioLogin=(request, response)=>{
    response.render('auth/login', {
        //autenticado: true, //JSON
        page: "Ingresa a la plataforma"
    })
}

const formularioRegister=(request, response)=>{
    response.render('auth/register', {
        page: "Crea una nueva cuenta"
    })
}

const formularioPasswordRecovery=(request, response)=>{
    response.render('auth/passwordRecovery', {
        page: "Recupera tu contraseña"
    })
}

const createNewUser= async(request, response) =>
{
       console.log("Registrando a un nuevo usuario")
       console.log(request.body);

       //Registramos los datos en la base de datos 
        const newUsers = await User.create({
            name: request.body.nombre_usuraio,
            email:request.body.correo_usuario,
            password:request.body.pass_usuario,
        });
        
        response.json(newUsers);
}


export {formularioLogin, formularioRegister, formularioPasswordRecovery, createNewUser}