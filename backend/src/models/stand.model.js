// Importamos Mongoose para definir el modelo del stand
import mongoose from "mongoose";

// Definimos la estructura que tendrá cada stand en la base de datos
const standSchema = new mongoose.Schema(
    {

        // Almacenamos el nombre del stand
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos la categoría del stand
        categoria: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos la ubicación del stand
        ubicacion: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos el horario de atención del stand
        horario: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos el responsable del stand
        responsable: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos la descripción del stand
        descripcion: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos la ruta de la imagen del stand
        imagen: {
            type: String,
            required: true
        },

        // Indicamos si el stand está disponible para el público
        estado: {
            type: String,
            enum: ["Activo", "Cancelado"],
            default: "Activo"
        }

    },
    {

        // Agregamos automáticamente las fechas de creación y actualización
        timestamps: true

    }
);

// Creamos el modelo Stand a partir del esquema definido
const Stand = mongoose.model("Stand", standSchema);

// Exportamos el modelo para utilizarlo en otros archivos
export default Stand;