import {  check, validationResult } from 'express-validator'
import User from '../models/Users.js'
import {generarId} from '../herlpers/tokens.js'
import { emailAfterRegister } from '../herlpers/email.js'





const formularioLogin= (request, response) =>{
    response.render('auth/login',{
        page: "Ingresa a la plataforma"
        //csrfToken: request.csrfToken()
    })
}

const formularioRegister= (request, response) =>{
    response.render('auth/register',{
        page: "crea una nueva cuenta"
        
    })
}

const register = async(request, response) =>{
   /*=async*/ 

   await check(`name`).notEmpty().withMessage("El nombre del usuario es un campo obligatorio").run(request)
   await check("email").notEmpty().withMessage("El correo electronico es un campo obligatorio").isEmail().withMessage("El correo electronico no tiene el formato obligatoprio").run(request)
   await check("password").notEmpty().withMessage("La contraseña es un campo obligatorio").isLength({min:8}).withMessage("La contraseña debe ser  de almenos 8 caracteres").run(request)
   await check("password_confirm").equals(request.body.password).withMessage("la contraseña y su confirmacion debe coincidir").run(request)

   let resultado =validationResult(request)
    
   if (!resultado.isEmpty()) {
    return response.render('auth/register', {
        page: 'Crear cuenta',
        errores: resultado.array(),
        user: { 
            name: request.body.name,
            email: request.body.email,  
        }
    });
}

const { name, email, password } = request.body;
const existingUser = await User.findOne({ where: { email } });

if (existingUser) {
    return response.render("auth/register", {
        page: "Error al intentar crear la cuenta de usuario",
        errores: [{ msg: `El usuario ${email} ya se encuentra registrado` }],
        user: {  // Cambié 'users' a 'user' y lo llené con los valores correctos
            name: request.body.name,
            email: request.body.email,
        }
    });
}


console.log("Registrado a un nuevo usuario");
console.log(request.body);

const newUser= await User.create({
    name,
    email,
    password, 
    token: generarId()
});

emailAfterRegister({
    name: newUser.name,
    email: newUser.email,
    token: newUser.token
})

response.render("templates/mesage",{
    page: "cuenta creada correctamente",
    menssage:  `hemos enviado un email de confirmacion a ${email}`
})

//response.json(newUser);

//return;

}

const confirmAccount = async (request, response) => {
    const { token } = request.params;
    const confirmUser = await User.findOne({ where: { token } });
    
    if (!confirmUser) {
        return response.render('auth/confirmAccount', {  
            page: 'Error al confirmar tu Cuenta',
            message: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true,
        });
    }

    // Confirmar la cuenta
    confirmUser.token = null;
    confirmUser.confirmAccount = true;
    await confirmUser.save();

    response.render('auth/confirmAccount', { 
        page: 'Cuenta Confirmada',
        message: 'La cuenta se confirmó correctamente',
    });
}

const formularioPasswordRecovery= (request, response) =>{
    response.render('auth/passwordRecovery',{
        page: "Recuperar contraseña" 
        
    })
}

export {
    formularioLogin, formularioRegister, register, confirmAccount, formularioPasswordRecovery
}