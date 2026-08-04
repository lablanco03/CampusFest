// Importamos Mongoose para definir el modelo de la actividad
import mongoose from "mongoose";

// Definimos la estructura que tendrá cada actividad en la base de datos
const actividadSchema = new mongoose.Schema(
    {

        // Almacenamos el nombre de la actividad
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos la categoría de la actividad
        categoria: {
            type: String,
            enum: [
                "Cultural",
                "Deportivo",
                "Tecnológico",
                "Artístico",
                "Gastronómico"
            ],
            required: true
        },

        // Almacenamos la fecha de la actividad
        fecha: {
            type: Date,
            required: true
        },

        // Almacenamos la hora de inicio
        horaInicio: {
            type: String,
            required: true
        },

        // Almacenamos la hora de finalización
        horaFin: {
            type: String,
            required: true
        },

        // Almacenamos el lugar donde se realizará la actividad
        lugar: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos la descripción de la actividad
        descripcion: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos los requisitos para participar
        requisitos: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos el cupo máximo permitido
        cupoMaximo: {
            type: Number,
            required: true,
            min: 1
        },

        // Almacenamos la cantidad de personas inscritas
        cuposOcupados: {
            type: Number,
            default: 0,
            min: 0
        },

        // Almacenamos la ruta de la imagen de la actividad
        imagen: {
            type: String,
            required: true
        },

        // Indicamos si la actividad está disponible para el público
        estado: {
            type: String,
            enum: ["Activa", "Cancelada"],
            default: "Activa"
        }

    },
    {

        // Agregamos automáticamente las fechas de creación y actualización
        timestamps: true

    }
);

// Creamos el modelo Actividad a partir del esquema definido
const Actividad = mongoose.model("Actividad", actividadSchema);

// Exportamos el modelo para utilizarlo en otros archivos
export default Actividad;