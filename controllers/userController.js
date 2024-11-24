import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import { generatetid } from '../helpers/tokens.js';
import { emailAfterRegister } from '../helpers/email.js';


// Renderizar formulario de inicio de sesión
const formularioLogin = (req, res) => {
    res.render('auth/login', {
        autenticado: false,
        page: 'Ingresa a la plataforma',
    });
};

// Renderizar formulario de registro
const formularioRegister = (req, res) => {
    res.render('auth/register', {
        page: 'Crea una nueva cuenta',
        nombre_usuario: '',  // Inicializamos vacíos los campos
        correo_usuario: '',
    });
};

// Crear un nuevo usuario
const createNewUser = async (req, res) => {
    // Realizar validaciones en los campos del formulario
    await check('nombre_usuario').notEmpty().withMessage('El nombre no puede ir vacío').run(req);
    await check('correo_usuario').notEmpty().withMessage('El correo electrónico es un campo obligatorio')
        .isEmail().withMessage('No es un email correcto').run(req);
    await check('pass_usuario').notEmpty().withMessage('La contraseña es un campo obligatorio')
        .isLength({ min: 8 }).withMessage('La contraseña debería tener al menos 8 caracteres').run(req);
    await check('pass2_usuario').equals(req.body.pass_usuario).withMessage('Las contraseñas no coinciden').run(req);
    await check('fecha_nacimiento').notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isDate().withMessage('La fecha no es válida').run(req);

    // Verificar los resultados de las validaciones
    const result = validationResult(req);

    // Si hay errores, regresar al formulario con los mensajes y los valores ingresados por el usuario
    if (!result.isEmpty()) {
        return res.render('auth/register', {
            page: 'Error al intentar crear la cuenta',
            errors: result.array(),
            nombre_usuario: req.body.nombre_usuario,  
            correo_usuario: req.body.correo_usuario,  
            fecha_nacimiento: req.body.fecha_nacimiento,
        });
    }

    // Desestructurar los parámetros del request
    const { nombre_usuario: name, correo_usuario: email, pass_usuario: password, fecha_nacimiento } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.render('auth/register', {
            page: 'Error al intentar crear la cuenta de Usuario',
            errors: [{ msg: `El usuario ${email} ya está registrado.` }],
            nombre_usuario: name, 
            correo_usuario: email,
            fecha_nacimiento, 
        });
    }

    // Convertir la fecha de nacimiento a UTC
    const fechaNacimiento = moment(req.body.fecha_nacimiento).utc().format('YYYY-MM-DD HH:mm:ss');

    // Crear un nuevo usuario
    const newUser = await User.create({
        name,
        email,
        password,
        fecha_nacimiento: fechaNacimiento,  
        token: generatetid(),  
    });

    // Enviar correo de confirmación
    emailAfterRegister({
        name: newUser.name,
        email: newUser.email,
        token: newUser.token,
    });

    // Mostrar un mensaje de éxito
    res.render('templates/message', {
        page: 'Cuenta creada correctamente',
        message: `Hemos enviado un email de confirmación al correo: ${email}`,
    });
};


// Confirmar cuenta (si el usuario hace clic en el enlace de confirmación del correo)
const confirm = async (req, res) => {
    const { token } = req.params;

    // Verificar si el token es válido
    const user = await User.findOne({ where: { token } });
    if (!user) {
        return res.render('auth/confirmAccount', {
            page: 'Error al confirmar tu cuenta...',
            msg: 'Hubo un error al confirmar tu cuenta, intenta de nuevo.',
            error: true,
        });
    }

    // Confirmar la cuenta
    user.token = null;  // Eliminar el token
    user.confirmacion = true;  // Marcar la cuenta como confirmada
    await user.save();  // Guardar cambios en la base de datos

    res.render('auth/confirmAccount', {
        page: 'Cuenta Confirmada',
        msg: 'La cuenta se ha confirmado correctamente.',
        error: false,
    });
};

// Renderizar formulario de recuperación de contraseña
const formularioPasswordRecovery = (req, res) => {
    res.render('auth/passwordRecovery', {
        page: 'Recupera tu contraseña',
    });
};

export {
    formularioLogin,
    formularioRegister,
    createNewUser,
    confirm,
    formularioPasswordRecovery,
};
