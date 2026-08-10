import bcrypt from "bcrypt";
import { obtenerAdministradorParaLogin } from "../services/administrador.service.js";
 
export async function login(req, res) {
    try {
        const { correo, contrasena } = req.body;
 
        if (!correo || !contrasena) {
            return res.status(400).json({ error: "Correo y contraseña son obligatorios." });
        }
 
        const administrador = await obtenerAdministradorParaLogin(correo);
 
        if (!administrador) {
            return res.status(401).json({ error: "Credenciales inválidas." });
        }
 
        if (!administrador.estado) {
            return res.status(401).json({ error: "Esta cuenta de administrador está deshabilitada." });
        }
 
        const contrasenaValida = await bcrypt.compare(contrasena, administrador.contrasena);
 
        if (!contrasenaValida) {
            return res.status(401).json({ error: "Credenciales inválidas." });
        }
 
        req.session.administrador = {
            id: administrador._id,
            nombre: administrador.nombre,
            correo: administrador.correo
        };
 
        return res.json({
            mensaje: "Sesión iniciada correctamente.",
            administrador: req.session.administrador
        });
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ error: "Error interno al iniciar sesión." });
    }
}
 
export function logout(req, res) {
    req.session.destroy((error) => {
        if (error) {
            console.error("Error cerrando sesión:", error);
            return res.status(500).json({ error: "No se pudo cerrar la sesión." });
        }
 
        res.clearCookie("connect.sid");
        return res.json({ mensaje: "Sesión cerrada correctamente." });
    });
}
