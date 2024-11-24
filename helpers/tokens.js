

//cada segundo que pase se asegura que ningun toque es igual a otro 
const generatetid=() => Date.now().toString(32) + Math.random().toString(32).substring(2) + Date.now().toString(32);

export{
    generatetid
}