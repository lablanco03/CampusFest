import mongoose from "mongoose";
import config from "./env.js";

const conectarBD = async () => {
    try {
        await mongoose.connect(config.mongoURI);

        console.log("Base de datos conectada correctamente.");
    } catch (error) {
        console.error("Error al conectar con MongoDB:");
        console.error(error.message);

        process.exit(1);
    }
};

export default conectarBD;