import { check,validationResult } from "express-validator"
import User from "../models/Users.js"
import { generarId } from "../herlpers/tokens.js"

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

const createNewUser = async(request, response) =>{
    await check('name').notEmpty().withMessage('El nombre no debe ir vacio, intente de nuevo.').run(request)
    await check('email').isEmail().withMessage('Por favor, ingrese un correo electronico valido.').run(request)
    await check('password').isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres.').run(request)
    await check('password_confirm').custom((value, { request }) => value === request.body.password).withMessage('Las contraseñas no coinciden').run(request)
  
    let result = validationResult(request)
    //return request.json(result.array())

    //que el resultado este vacio
    if (!result.isEmpty()){
        return response.render('auth/register',{
            page: "crear una cuenta",
            errors: result.array(),
            user:{
                name: request.body.name,
                email: request.body.email,
            }
          

        })
    } 

    const user = await User.create(request.body);
    response.json(user);

    //extraer los datos
    const {name, email, password} = request.body

     //verificar que el usuario no este duplicado

    const userExist = await User.findOne({where: {email}})
    if(userExist){
        return response.render('auth/register',{
            page: "crear una cuenta",
            errors: [{msg: 'El usuario ya esta registrado'}],
            user:{
                name: request.body.name,
                email: request.body.email,
            }

        })
    }

    //almacenar un usuario

    const User = await User.create({
        name,
        email,
        password,
        token: generarId

    })

    //mostrar mensaje de confirmacion
    res.render('templanes/messsage', {
        page: 'Cuenta creada',
        msg: `Se a enviado un email de confirmación a: ${email}, por favor, ingrese al siguiente enlace`
    })
   
   
   
   
   
    registerEmail({
        name: user.name,
        email: user.email,
        token: user.token
    })
    


    

}


export {formularioLogin, formularioRegister, formularioPasswordRecovery, createNewUser}