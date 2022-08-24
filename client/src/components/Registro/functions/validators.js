
const validPassword = /^[a-z]+$/i;
const validator = function(valores){
    let errores = {};
    let hayErrores = false;

    if(!valores.username){
        hayErrores =true;
        errores.username = "Ingrese su nombre de usuario"
    }
    if (!valores.email) {
        hayErrores =true;
      errores.email = "Por favor ingrese un e-mail";
    }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(valores.email)){
      errores.email = "El e-mail es invalido";
      hayErrores =true;
    }
    if (!valores.password) {
      errores.password = "Por favor ingrese una contraseña"
      hayErrores =true;
    // }else if(!validPassword.test(valores.password)){
        
    //   errores.password = "la contra no es valida"
    //   hayErrores =true;
    } else if(valores.password.length < 4){
      errores.password = "La longitud mínima es de 4 dígitos"
      hayErrores =true;
    }else if(valores.confirm !== valores.password) {
      errores.confirm = "Las contraseñas no coinciden"
      hayErrores =true;
    }


    if(hayErrores){
        return errores;
    }else{
        return false;
    }

}

export default validator;