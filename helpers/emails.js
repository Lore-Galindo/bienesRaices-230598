import nodemailer from 'nodemailer'
const registerEmail = async (data) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const {email, name, token} = data
    
    //enviar el email
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Hola!, Confirma tu Cuente en BienesRacies.com',
        text: '¡Gracias por subscribirte a la comunidad de BienesRacices!',
        html:  `
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
            Hola, ${name}<br>
            Tu cuenta ya está casi lista. Solo debes confirmarla haciendo clic en el siguiente enlace:
        </p>
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirm/${token}" class="button">Confirmar Cuenta</a>
        <p class="message">Una vez confirmes tu cuenta, podrás acceder a todos nuestros servicios y explorar las mejores opciones de bienes raíces. ¡Estamos emocionados de tenerte con nosotros!</p>
        <p class="message">Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
        <p class="signature">Atentamente,<br>El equipo de Bienes Raíces</p>
        <div class="logo">
            <h2 style="text-align: center"> Atentamente: </h2>
            <img src="https://xdddd.s3.us-east-2.amazonaws.com/firma.png" alt="Logo de Bienes Raíces">
            <h2 style="text-align: center"> Lorena Citlalli Galindo Gonzalez </h2>
            <p style="text-align: center">CEO de BienesRaices</p>
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

const passwordRecoveryEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const { email, name, token } = data;

    // Enviar el email
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Recupera tu contraseña - BienesRaices.com',
        text: `Hola, ${name}. Hemos recibido una solicitud para restablecer tu contraseña.`,
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
    </style>
</head>
<body>
    <div class="container">
        <div class="title">¡Recupera tu contraseña!</div>
        <p class="message">
            Hola, ${name}<br>
            Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Para proceder, haz clic en el siguiente enlace:
        </p>
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/passwordRecovery/${token}" class="button">Restablecer Contraseña</a>
        <p class="message">Si no solicitaste este cambio, puedes ignorar este mensaje. Tu cuenta seguirá siendo segura.</p>
        <p class="signature">Atentamente,<br>El equipo de Bienes Raíces</p>
        <div class="logo">
            <h2 style="text-align: center"> Atentamente: </h2>
            <img src="https://xdddd.s3.us-east-2.amazonaws.com/firma.png" alt="Logo de Bienes Raíces">
            <h2 style="text-align: center"> Lorena Citlalli Galindo Gonzalez </h2>
            <p style="text-align: center">CEO de BienesRaices</p>
        </div>
        <div class="footer">
            &copy; 2024 BienesRaices.com - Todos los derechos reservados.<br>
            <a href="#">Políticas de Privacidad</a> | <a href="#">Términos de Servicio</a>
        </div>
    </div>
</body>
</html>
        `,
    });
};



export {
    registerEmail,passwordRecoveryEmail
}