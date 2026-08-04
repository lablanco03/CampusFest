// Importamos Mongoose para definir el modelo del administrador
import mongoose from "mongoose";

// Definimos la estructura que tendrá cada administrador en la base de datos
const administradorSchema = new mongoose.Schema(
    {

        // Almacenamos el nombre del administrador
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        // Almacenamos el correo electrónico del administrador
        correo: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        // Almacenamos la contraseña cifrada del administrador
        contrasena: {
            type: String,
            required: true,
            select: false
        },

        // Indicamos si el administrador tiene acceso al sistema
        estado: {
            type: Boolean,
            default: true
        }

    },
    {

        // Agregamos automáticamente las fechas de creación y actualización
        timestamps: true,

        // Evitamos que Mongoose agregue el campo "__v"
        versionKey: false

    }
);

// Creamos el modelo Administrador a partir del esquema definido
const Administrador = mongoose.model("Administrador", administradorSchema);

// Exportamos el modelo para utilizarlo en otros archivos
export default Administrador;