function validarCorreo(correoElectronico){
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionCorreo.test(correoElectronico);
}

function validarTelefono(telefono){
    const expresionTelefono = /^[0-9]{4}-[0-9]{4}$/;
    return expresionTelefono.test(telefono);
}

function validarFormulario(){
    const nombreCompleto =
        document.getElementById('txtNombreCompleto').value.trim();

    const identificacion =
        document.getElementById('txtIdentificacion').value.trim();

    const correoElectronico =
        document.getElementById('txtCorreoElectronico').value.trim();

    const telefono =
        document.getElementById('txtTelefono').value.trim();

    const actividad =
        document.getElementById('ddlActividad').value;

    const aceptaTerminos =
        document.getElementById('chkAceptaTerminos').checked;

    if(nombreCompleto === ''){
        return 'Ingrese el nombre completo.';
    }

    if(identificacion === ''){
        return 'Ingrese la identificación.';
    }

    if(!validarCorreo(correoElectronico)){
        return 'Ingrese un correo válido.';
    }

    if(!validarTelefono(telefono)){
        return 'Ingrese un teléfono válido.';
    }

    if(actividad === ''){
        return 'Seleccione una actividad.';
    }

    if(!aceptaTerminos){
        return 'Debe aceptar la confirmación.';
    }

    return '';
}