import "dotenv/config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Administrador from "../models/administrador.model.js";
import config from "../config/env.js";
 
async function seed() {
    await mongoose.connect(config.mongoURI);
 
    const correo = "admin@campusfest.edu.cr";
    const contrasenaPlano = "admin123";
 
    const yaExiste = await Administrador.findOne({ correo });
 
    if (yaExiste) {
        console.log("Ya existe un administrador con ese correo:", correo);
        await mongoose.disconnect();
        return;
    }
 
    const contrasenaHash = await bcrypt.hash(contrasenaPlano, 10);
 
    await Administrador.create({
        nombre: "Administrador CampusFest",
        correo,
        contrasena: contrasenaHash,
        estado: true
    });
 
    console.log("Administrador creado con éxito:", correo);
    await mongoose.disconnect();
}
 
seed().catch((error) => {
    console.error("Error creando administrador:", error);
    mongoose.disconnect();
});
