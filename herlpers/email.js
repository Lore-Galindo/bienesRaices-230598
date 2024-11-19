import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({path: 'env'})
 const emailAfterRegister = async (newUserData) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    //CONSOLE.LOG(DATA)
    const {email, name, token}= newUserData

    //Enviar el email
    await transport.sendMail({
        from: 'bienesraices-matrices.com',
        to: email,
        subject: 'Bienvenido/a al BienesRaices-230598',
        text: 'Ya casi puedes usar nuestra plataforma, solo falta...',
        html: `<p> Hola, <span style="color: red"> ${name}</span>, <br>
        Bienvenido ala plataforma de BienesRices, el sitio seguro  donde podras buscar, comprar y ofertar propiedades a travesz de internet.
        <br>
        <p>Ya solo necesitamos confirmes la cuenta que creaste, dando click a la suiguiente liga: <a href="${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}"> Confirmar cuenta </a></p>
        <br>
        <p>si  tu no has creado la cuenta ignora este mensaje`
    })
 }