function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        res.sendStatus(403);
        return;
    }

    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    req.token = token;

    next();
}

module.exports = verifyToken;
