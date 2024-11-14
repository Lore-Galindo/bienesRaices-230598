//import { request, response } from "express"
import { check,validationResult } from "express-validator"
import Users from "../models/Users.js"
import { request, response } from "express"


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
//Desestructurar los parametros del request 
const {nombre_usuario:name, correo_usuario:email, pass_usuario:password}=request.body

//verificar que el usuario no existe previamente en la bd
const existingUser= await User.findOne ({ where: { email}}


)





const createNewUser= async(request, response) =>
{
        await check('nombre_usuario').notEmpty().run(request)
        let resultado = validationResult(request)
        response.json(resultado.array())
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