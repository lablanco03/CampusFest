import { registrarInscripcion } from "../services/inscripcion.service.js";

export async function crearInscripcion(req, res) {
    try {
        const inscripcion = await registrarInscripcion(req.body);

        if (!inscripcion) {
            return res.status(400).json({
                error: "No fue posible completar la inscripción. Verifica que la actividad exista, esté activa y tenga cupo disponible."
            });
        }

        res.status(201).json(inscripcion);
    } catch (error) {
        console.error("Error al crear inscripción:", error.message);
        res.status(500).json({ error: "No fue posible procesar la inscripción." });
    }
}