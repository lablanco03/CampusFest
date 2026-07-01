const formularioInscripcion =
    document.getElementById('formularioInscripcion');

const mensajeFormulario =
    document.getElementById('mensajeFormulario');

formularioInscripcion.addEventListener(
    'submit',
    function(evento){

        evento.preventDefault();

        const mensajeError = validarFormulario();

        if(mensajeError !== ''){
            mensajeFormulario.style.color = '#DC2626';
            mensajeFormulario.textContent = mensajeError;
            return;
        }

        mensajeFormulario.style.color = '#2E8B57';
        mensajeFormulario.textContent =
            'Inscripción realizada correctamente.';

        formularioInscripcion.reset();
    }
);