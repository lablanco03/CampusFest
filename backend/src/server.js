import app from "./app.js";
import config from "./config/env.js";
import conectarBD from "./config/database.js";

const iniciarServidor = async () => {
    await conectarBD();

    app.listen(config.port, () => {
        console.log(`Servidor ejecutándose en http://localhost:${config.port}`);
    });
};

iniciarServidor();