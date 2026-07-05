document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioLogin');
    const txtCorreo = document.getElementById('txtCorreo');
    const txtContrasena = document.getElementById('txtContrasena');
    const btnTogglePassword = document.getElementById('btnTogglePassword');
    const iconoOjoCerrado = document.getElementById('iconoOjoCerrado');
    const iconoOjoAbierto = document.getElementById('iconoOjoAbierto');

    // Mostrar/ocultar contraseña
    btnTogglePassword.addEventListener('click', () => {
        const tipo = txtContrasena.getAttribute('type') === 'password' ? 'text' : 'password';
        txtContrasena.setAttribute('type', tipo);

        // Alternar visibilidad de los iconos
        if (tipo === 'text') {
            iconoOjoCerrado.style.display = 'none';
            iconoOjoAbierto.style.display = 'inline';
        } else {
            iconoOjoCerrado.style.display = 'inline';
            iconoOjoAbierto.style.display = 'none';
        }
    });

    // Validación al enviar
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const correo = txtCorreo.value.trim();
        const contrasena = txtContrasena.value.trim();

        if (!correo) {
            alert('Por favor ingrese su correo electrónico.');
            return;
        }
        if (!contrasena) {
            alert('Por favor ingrese su contraseña.');
            return;
        }

        if (correo === 'admin@campusfest.edu.cr' && contrasena === 'admin123') {
            window.location.href = 'panel_admin.html';
        } else {
            alert('Credenciales inválidas. Use los datos de la caja Demo.');
        }
    });
});