import express from "express";
import helmet from "helmet";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import { fileURLToPath } from "url";
import config from "./config/env.js";
import actividadRoutes from "./routes/actividad.routes.js";
import agendaRoutes from "./routes/agenda.routes.js";
import standRoutes from "./routes/stand.routes.js";
import inscripcionRoutes from "./routes/inscripcion.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.disable("x-powered-by");

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

app.use("/api/actividades", actividadRoutes);
app.use("/api/agenda", agendaRoutes);
app.use("/api/stands", standRoutes);
app.use("/api/inscripciones", inscripcionRoutes);

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

export default app;