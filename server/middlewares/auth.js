const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return next("error");
        }

        const decodedData = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
        req.userId = decodedData?.id;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = auth;