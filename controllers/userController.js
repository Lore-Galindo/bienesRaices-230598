import {  check, validationResult } from 'express-validator'
import User from '../models/Users.js'
import {generarId} from '../herlpers/tokens.js'
import { request, response } from 'express'
import { emailAfterRegister } from '../herlpers/email.js'





const formularioLogin= (request, response) =>{
    response.render('auth/login',{
        page: "Ingresa a la plataforma"
    })
}

const formularioRegister= (request, response) =>{
    response.render('auth/register',{
        page: "crea una nueva cuenta"
    })
}

const formularioPasswordRecovery= (request, response) =>{
    response.render('auth/passwordRecovery',{
        page: "Recuperar contraseña" 
    })
}


const CreateNewUser=async(request, response) =>{
   /*=async*/ 

   await check(`name`).notEmpty().withMessage("El nombre del usuario es un campo obligatorio").run(request)
   await check("email").notEmpty().withMessage("El correo electronico es un campo obligatorio").isEmail().withMessage("El correo electronico no tiene el formato obligatoprio").run(request)
   await check("password").notEmpty().withMessage("La contraseña es un campo obligatorio").isLength({min:8}).withMessage("La contraseña debe ser  de almenos 8 caracteres").run(request)
   await check("password_confirm").equals(request.body.password).withMessage("la contraseña y su confirmacion debe coincidir").run(request)

   let resultado =validationResult(request)
    if(!resultado.isEmpty()){
        return response.render(`auth/register`,{
        page: `Error al intentar crear la cuenta de usuario`,
        errores: resultado.array(),
        User:{
            name: request.body.name,
            email: request.email,
        }
    })
  } 

/*else{
    console.log("registrando a un nuevo usuario");
    console.log(req.body);
   

}*/

  // res.json(resultado.array());


const {name: name, email:email,password:password}= request.body;
const existingUser=await User.findOne({where:{email}})

console.log(existingUser);

if(existingUser)
{
    return response.render("auth/register",{
        page: `Error al intentar crear la cuenta de usuario`,
        errores: [{msg: `El usuario ${email} ya se encuentra registrado`}],
        users:{
            name: name
        
        }
    })
   
}

console.log("Registrado a un nuevo usuario");
console.log(request.body);

const newUser= await User.create({
    name: request.body.name,
    email: request.body.password,
    password: request.body.password_confirm, 
    token: generarId()
});

emailAfterRegister({
    name: newUser.name,
    email: newUser.email,
    token: newUser.token
})

response.render("templanes/menssage",{
    page: "cuenta creada correctamente",
    menssage:  `hemos enviado un email de confirmacion a ${email}`
})

//response.json(newUser);

//return;

}

const confirm=(request,response)=>{
    //validacion token 
    

    //
    const {token}=request.params
    console.log(`Intentando confirmar la cuenta con el token: ${token}`);
}

export {formularioLogin, formularioRegister, formularioPasswordRecovery, CreateNewUser,confirm}