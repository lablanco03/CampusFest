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

        if (tipo === 'text') {
            iconoOjoCerrado.style.display = 'none';
            iconoOjoAbierto.style.display = 'inline';
        } else {
            iconoOjoCerrado.style.display = 'inline';
            iconoOjoAbierto.style.display = 'none';
        }
    });

    // Envío real al backend
    formulario.addEventListener('submit', async (e) => {
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

        try {
            const respuesta = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, contrasena })
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                alert(datos.error || 'Credenciales inválidas.');
                return;
            }

            window.location.href = 'panel_admin.html';
        } catch (error) {
            console.error('Error de red al iniciar sesión:', error);
            alert('Error de conexión con el servidor. Intenta de nuevo.');
        }
    });
});