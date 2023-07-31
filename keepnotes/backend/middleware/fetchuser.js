const jwt = require('jsonwebtoken');

const JWT_SECRET = "ram";

let fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object

    let token = req.header("auth-token");
    if (!token) {
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticae using a valid token" })

    }

}

module.exports = fetchuser;
