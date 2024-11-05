export const checkUserRole = (req, res, next) => {
    console.log("req", req);
    if (req.user.role !== "admin") {
        return res.status(403).send("Доступ запрещен");
    }
    next();
}
