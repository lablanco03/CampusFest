import {
    actualizarActividad,
    cambiarEstadoActividad,
    obtenerActividades
} from "../services/actividad.service.js";
 
import {
    actualizarStand,
    cambiarEstadoStand,
    obtenerStands
} from "../services/stands.service.js";
 
import {
    obtenerInscripciones,
    eliminarInscripcion as eliminarInscripcionService
} from "../services/inscripcion.service.js";
 
// ---------- ACTIVIDADES ----------
 
export async function listarActividades(req, res) {
    try {
        const actividades = await obtenerActividades();
        return res.json(actividades);
    } catch (error) {
        console.error("Error listando actividades:", error);
        return res.status(500).json({ error: "No se pudieron obtener las actividades." });
    }
}
 
export async function editarActividad(req, res) {
    try {
        const actividadActualizada = await actualizarActividad(req.params.id, req.body);
 
        if (!actividadActualizada) {
            return res.status(404).json({ error: "Actividad no encontrada." });
        }
 
        return res.json(actividadActualizada);
    } catch (error) {
        console.error("Error actualizando actividad:", error);
        return res.status(400).json({ error: "No se pudo actualizar la actividad.", detalle: error.message });
    }
}
 
export async function toggleEstadoActividad(req, res) {
    try {
        const actividad = await cambiarEstadoActividad(req.params.id);
 
        if (!actividad) {
            return res.status(404).json({ error: "Actividad no encontrada." });
        }
 
        return res.json(actividad);
    } catch (error) {
        console.error("Error cambiando estado de actividad:", error);
        return res.status(500).json({ error: "No se pudo cambiar el estado de la actividad." });
    }
}
 
// ---------- STANDS ----------
 
export async function listarStands(req, res) {
    try {
        const stands = await obtenerStands();
        return res.json(stands);
    } catch (error) {
        console.error("Error listando stands:", error);
        return res.status(500).json({ error: "No se pudieron obtener los stands." });
    }
}
 
export async function editarStand(req, res) {
    try {
        const standActualizado = await actualizarStand(req.params.id, req.body);
 
        if (!standActualizado) {
            return res.status(404).json({ error: "Stand no encontrado." });
        }
 
        return res.json(standActualizado);
    } catch (error) {
        console.error("Error actualizando stand:", error);
        return res.status(400).json({ error: "No se pudo actualizar el stand.", detalle: error.message });
    }
}
 
export async function toggleEstadoStand(req, res) {
    try {
        const stand = await cambiarEstadoStand(req.params.id);
 
        if (!stand) {
            return res.status(404).json({ error: "Stand no encontrado." });
        }
 
        return res.json(stand);
    } catch (error) {
        console.error("Error cambiando estado de stand:", error);
        return res.status(500).json({ error: "No se pudo cambiar el estado del stand." });
    }
}
 
// ---------- INSCRIPCIONES ----------
 
export async function listarInscripciones(req, res) {
    try {
        const inscripciones = await obtenerInscripciones();
        return res.json(inscripciones);
    } catch (error) {
        console.error("Error listando inscripciones:", error);
        return res.status(500).json({ error: "No se pudieron obtener las inscripciones." });
    }
}
 
export async function eliminarInscripcion(req, res) {
    try {
        const eliminada = await eliminarInscripcionService(req.params.id);
 
        if (!eliminada) {
            return res.status(404).json({ error: "Inscripción no encontrada." });
        }
 
        return res.json({ mensaje: "Inscripción eliminada correctamente." });
    } catch (error) {
        console.error("Error eliminando inscripción:", error);
        return res.status(500).json({ error: "No se pudo eliminar la inscripción." });
    }
}
 
// ---------- REPORTES (RF-21) ----------
 
export async function obtenerReportes(req, res) {
    try {
        const actividades = await obtenerActividades();
        const stands = await obtenerStands();
        const inscripciones = await obtenerInscripciones();
 
        const porCategoria = {};
        actividades.forEach((actividad) => {
            porCategoria[actividad.categoria] = (porCategoria[actividad.categoria] || 0) + 1;
        });
 
        const ocupacionPorActividad = actividades.map((actividad) => ({
            nombre: actividad.nombre,
            categoria: actividad.categoria,
            cupoMaximo: actividad.cupoMaximo,
            cuposOcupados: actividad.cuposOcupados,
            porcentaje: actividad.cupoMaximo > 0
                ? Math.round((actividad.cuposOcupados / actividad.cupoMaximo) * 100)
                : 0
        }));
 
        return res.json({
            totales: {
                actividades: actividades.length,
                inscripciones: inscripciones.length,
                stands: stands.length
            },
            porCategoria,
            ocupacionPorActividad
        });
    } catch (error) {
        console.error("Error generando reportes:", error);
        return res.status(500).json({ error: "No se pudieron generar los reportes." });
    }
}
