import { obtenerActividades } from "../services/actividad.service.js";

export async function listarAgenda(req, res) {
    try {
        const actividades = await obtenerActividades();
        res.json(actividades);
    } catch (error) {
        console.error("Error al listar agenda:", error.message);
        res.status(500).json({ error: "No fue posible obtener la agenda." });
    }
}