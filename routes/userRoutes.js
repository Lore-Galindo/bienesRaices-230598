import express from 'express';
import { 
    formLogin,formCreateAccount,formPasswordRecovery,create,confirmAccount,checkToken,newPassword,confirm,resetPassword
} from '../controllers/userControllers.js';

const router = express.Router();

// Rutas personalizadas para pruebas
router.get("/FindById/:Id", function (req, res) {
    res.send(`Se está solicitando buscar al usuario con ID: ${req.params.Id}`);
});

router.post("/newUser/:name/:email/:password", function (req, res) {
    res.send(`Se ha solicitado la creación de un nuevo usuario con nombre: ${req.params.name}, 
        correo electrónico ${req.params.email}, y contraseña ${req.params.password}`);
});

router.put("/replaceUser/:name/:email/:password", function (req, res) {
    res.send(`Se está solicitando el reemplazo de toda la información del usuario ${req.params.name}, 
        con el correo electrónico ${req.params.email}, y la contraseña ${req.params.password}`);
});

router.patch("/updatePassword/:email/:newPassword/:passwordConfirm", function (req, res) {
    const { email, newPassword, passwordConfirm } = req.params;
    if (newPassword === passwordConfirm) {
        res.send(`Se acepta la actualización de la contraseña del usuario con correo: ${email}`);
    } else {
        res.send(`No se acepta la actualización, las contraseñas no coinciden.`);
    }
});

router.delete("/deleteUser/:name", function (req, res) {
    res.send(`Se está solicitando eliminar al usuario ${req.params.name}`);
});

// Rutas principales basadas en el controlador
router.get("/login", formLogin); // Mostrar formulario de inicio de sesión
router.get("/register", formCreateAccount); // Mostrar formulario de registro
router.post("/register", create); // Crear un nuevo usuario
router.get('/confirm_Account/:token', confirmAccount); // Confirmar cuenta a través de token
router.get('/confirm/:token', confirm); // Confirmar operación adicional
router.get("/passwordRecovery", formPasswordRecovery); // Mostrar formulario de recuperación de contraseña
router.post("/passwordRecovery",resetPassword)

router.get('/passwordRecovery/:token', checkToken); // Validar token para restablecimiento de contraseña
router.post('/passwordRecovery/:token', newPassword); // Guardar nueva contraseña

export default router;
