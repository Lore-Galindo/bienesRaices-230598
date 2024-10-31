//le estamos diciendo hacia que ruta tiene ir como cuando pregunta hacia donde quieren ir
const formularioLogin = (request, response)=> {
            response.render("auth/login", {
                autenticado:false 
})}

const formularioRegister = (request, response)=> {
                response.render('auth/register',{

})};
const formularioPasswordRecovery = (request, responde)=>{
    responde.render('auth/passwordRecory',{

})};
    
export {formularioLogin, formularioRegister ,formularioPasswordRecovery};

        
