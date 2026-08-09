export function verificarAdministrador(req, res, next) {
    if (req.session && req.session.administrador) {
        return next();
    }
 
    return res.status(401).json({ error: "No autorizado. Inicia sesión como administrador." });
}
 