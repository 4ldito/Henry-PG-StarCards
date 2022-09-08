
const validPassword = /^[a-z]+$/i;
const validator = function(valores){
    let errores = {};
    let hayErrores = false;

    if(!valores.username){
        hayErrores =true;
        errores.username = "Enter your user name"
    }
    if (!valores.email) {
        hayErrores =true;
      errores.email = "Enter an e-mail address";
    }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(valores.email)){
      errores.email = "The e-mail address is invalid";
      hayErrores =true;
    }
    if (!valores.password) {
      errores.password = "Enter a password"
      hayErrores =true;
    } else if(valores.password.length < 4){
      errores.password = "Minimum length is 4 digits"
      hayErrores =true;
    }else if(valores.confirm !== valores.password) {
      errores.confirm = "Passwords do not match"
      hayErrores =true;
    }


    if(hayErrores){
        return errores;
    }else{
        return false;
    }

}

export default validator;