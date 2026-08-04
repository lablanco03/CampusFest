import express from "express";
import helmet from "helmet";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import { fileURLToPath } from "url";

import config from "./config/env.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.disable("x-powered-by");

/* Middlewares */

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    helmet({
        contentSecurityPolicy: false
    })
);

app.use(
    express.static(path.join(__dirname, "../../frontend"))
);

/* Sesiones */

app.use(
    session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: config.mongoURI
        }),
        cookie: {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        }
    })
);

/* Ruta de prueba */

app.get("/", (req, res) => {
    res.send("Backend de CampusFest funcionando correctamente.");
});

export default app;