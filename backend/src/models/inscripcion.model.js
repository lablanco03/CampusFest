// Importamos Mongoose para definir el modelo de la inscripción
import mongoose from "mongoose";

// Definimos la estructura que tendrá cada inscripción en la base de datos
const inscripcionSchema = new mongoose.Schema(
    {

        // Almacenamos el nombre completo del participante
        nombreCompleto: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos la identificación del participante
        identificacion: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos el correo electrónico del participante
        correoElectronico: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        // Almacenamos el número telefónico del participante
        telefono: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos la carrera o grupo del participante
        carreraGrupo: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos la actividad a la que pertenece la inscripción
        actividad: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Actividad",
            required: true
        },

        // Almacenamos comentarios adicionales del participante
        comentarios: {
            type: String,
            trim: true,
            default: ""
        }

    },
    {

        // Agregamos automáticamente las fechas de creación y actualización
        timestamps: true

    }
);

// Creamos el modelo Inscripcion a partir del esquema definido
const Inscripcion = mongoose.model("Inscripcion", inscripcionSchema);

// Exportamos el modelo para utilizarlo en otros archivos
export default Inscripcion;