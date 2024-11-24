import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({path: '.env'})

const emailAfterRegister = async (newUserData) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const { email, name, token } = newUserData

    // Enviar el email
    await transport.sendMail({
        from: 'bienesraices_230297.com',
        to: email,
        subject: 'Bienvenido/a a BienesRaices_230297',
        text: 'Ya casi puedes usar nuestra plataforma, solo falta...',
        html: `
    <style>
      
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #F5EFE6; /* Fondo principal */
            color: #000000; /* Texto principal */
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #FFFFFF; /* Fondo del contenedor */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border: 2px solid #E7B8C9; /* Borde del contenedor */
        }
        .title {
            font-size: 24px;
            color: #E89BC7; /* Color del título */
            margin-bottom: 10px;
        }
        .message {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
            color: #000000; /* Color del texto */
        }
        .button {
            display: inline-block;
            background-color: #E89BC7; /* Color del botón */
            color: #FFFFFF; /* Color del texto del botón */
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 10px;
        }
        .button:hover {
            background-color: #E7B8C9; /* Color del botón al pasar el cursor */
        }
        .footer {
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
        .signature {
            margin-top: 20px;
            font-style: italic;
        }
        .logo img {
            width: 80px;
            margin-top: 20px;
        }

        /* Estilos para dispositivos móviles */
        @media screen and (max-width: 600px) {
            .container {
                width: 90%;
                padding: 15px;
            }
            .button {
                width: 100%;
                padding: 12px 0;
                font-size: 18px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="title">¡Bienvenido a Bienes Raíces!</div>
        <p class="message">
            Hola, <strong>${nombre}</strong><br>
            Tu cuenta ya está casi lista. Solo debes confirmarla haciendo clic en el siguiente enlace:
        </p>
        <a href="${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}/auth/confirmAccount/${token}" class="button">Confirmar Cuenta</a>
        <p class="message">Una vez confirmes tu cuenta, podrás acceder a todos nuestros servicios y explorar las mejores opciones de bienes raíces. ¡Estamos emocionados de tenerte con nosotros!</p>
        <p class="message">Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
        <p class="signature">Atentamente,<br>El equipo de Bienes Raíces</p>
        <div class="logo">
            <img src="https://example.com/images/Sin_titulo.png" alt="Logo de Bienes Raíces">
        </div>
        <div class="footer">
            &copy; 2024 BienesRaices.com - Todos los derechos reservados.<br>
            <a href="#">Políticas de Privacidad</a> | <a href="#">Términos de Servicio</a>
        </div>
    </div>
</body>
</html>





        `
    })
}

export { emailAfterRegister }