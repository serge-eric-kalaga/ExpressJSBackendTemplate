const jwt = require("jsonwebtoken");

const LoginRequired = function (req, res, next) {
    if (
        req.headers && req.headers.authorization &&
        req.headers.authorization.split(" ")[0] == "Bearer"
    ) {
        try {
            res.user = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWTKey)
            // console.log(res.user);
            next()
        } catch (error) {
            res.status(401).Response({ message: error.message })
        }
    } else {
        res.status(401).Response({ message: "Not authenticated !" })
    }
}

const IsAdmin = function (req, res, next) {

    if (
        req.headers && req.headers.authorization &&
        req.headers.authorization.split(" ")[0] == "Bearer"
    ) {
        try {
            res.user = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWTKey)

            if (res.user.role !== "ADMIN") {
                return res.status(403).Response({ message: "Access forbidden: Admins only." })
            }
            next()
        } catch (error) {
            res.status(401).Response({ message: error.message })
        }
    } else {
        res.status(401).Response({ message: "Not authenticated !" })
    }
}



module.exports = { LoginRequired, IsAdmin };