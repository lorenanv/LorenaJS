function validar(form) {
    let valido = true;
    let mensaje = 'No se ha podido enviar el formulario.';
    
    let nombre = form.firstName;
    let apellidos = form.lastName;
    let telefono = form.tlf;
    let correo = form.mail;

    const nombreRegEx = /[a-zA-Z]{3,15}$/;
    const apellidosRegEx = /^[A-Za-z]{3,20}(\s[A-Za-z]{3,20})*$/;
    const tlfRegEx = /^(\+34[\s\-]?)?(6|7|9)\d{8}$/;
    const mailRegEx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

    if(nombreRegEx.test(nombre.value) == false) {
        valido = false;
        mensaje= mensaje + '\nIntroduzca un nombre válido.';
    }

    if(apellidosRegEx.test(apellidos.value) == false) {
        valido = false;
        mensaje = mensaje + '\nIntroduzca apellidos válidos.';
    }

    if(tlfRegEx.test(telefono.value) == false) {
        valido = false;
        mensaje = mensaje + '\nIntroduzca un número de teléfono válido (XXXXXXXXX).';
    }

    if(mailRegEx.test(correo.value) == false) {
        valido = false;
        mensaje = mensaje + '\nIntroduzca un email válido (texto@texto.ej).';
    }

    if (valido && form.checkValidity()){
       alert("Se ha enviado correctamente");
        
       return true;
    }else{
        alert(mensaje);
    
        return false;
    }
}