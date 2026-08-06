const formularioInscripcion =
    document.getElementById('formularioInscripcion');

const mensajeFormulario =
    document.getElementById('mensajeFormulario');

const ddlActividad =
    document.getElementById('ddlActividad');

const btnEnviar =
    document.getElementById('btnEnviar');

async function cargarActividadesSelect(){

    try {
        const respuesta = await fetch('/api/actividades');
        const actividades = await respuesta.json();

        ddlActividad.innerHTML = '<option value="">Seleccione una actividad</option>';

        actividades.forEach(function(actividad){

            const cupoDisponible = actividad.cupoMaximo - actividad.cuposOcupados;
            const lleno = cupoDisponible <= 0 || actividad.estado === 'Cancelada';

            const opcion = document.createElement('option');
            opcion.value = actividad._id;
            opcion.textContent = lleno ? actividad.nombre + ' (sin cupo)' : actividad.nombre;
            opcion.disabled = lleno;

            ddlActividad.appendChild(opcion);
        });

        const parametros = new URLSearchParams(window.location.search);
        const idPreseleccionado = parametros.get('id');

        if(idPreseleccionado){
            ddlActividad.value = idPreseleccionado;
        }

    } catch (error) {
        console.error('Error al cargar actividades:', error.message);
        mensajeFormulario.style.color = '#DC2626';
        mensajeFormulario.textContent = 'No fue posible cargar las actividades.';
    }
}

formularioInscripcion.addEventListener(
    'submit',
    async function(evento){

        evento.preventDefault();

        const mensajeError = validarFormulario();

        if(mensajeError !== ''){
            mensajeFormulario.style.color = '#DC2626';
            mensajeFormulario.textContent = mensajeError;
            return;
        }

        const datosInscripcion = {
            nombreCompleto: document.getElementById('txtNombreCompleto').value.trim(),
            identificacion: document.getElementById('txtIdentificacion').value.trim(),
            correoElectronico: document.getElementById('txtCorreoElectronico').value.trim(),
            telefono: document.getElementById('txtTelefono').value.trim(),
            carreraGrupo: document.getElementById('txtCarreraGrupo').value.trim(),
            actividad: ddlActividad.value,
            comentarios: document.getElementById('txtaComentarios').value.trim()
        };

        btnEnviar.disabled = true;

        try {
            const respuesta = await fetch('/api/inscripciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosInscripcion)
            });

            const resultado = await respuesta.json();

            if(!respuesta.ok){
                mensajeFormulario.style.color = '#DC2626';
                mensajeFormulario.textContent = resultado.error || 'No fue posible completar la inscripción.';
                btnEnviar.disabled = false;
                return;
            }

            mensajeFormulario.style.color = '#2E8B57';
            mensajeFormulario.textContent = 'Inscripción realizada correctamente.';

            formularioInscripcion.reset();
            cargarActividadesSelect();

        } catch (error) {
            console.error('Error al enviar la inscripción:', error.message);
            mensajeFormulario.style.color = '#DC2626';
            mensajeFormulario.textContent = 'Ocurrió un error al procesar la inscripción.';
        }

        btnEnviar.disabled = false;
    }
);

cargarActividadesSelect();