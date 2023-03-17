const jwt = require("jsonwebtoken");
const { createError } = require("../error");

const auth = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    if (!token) {
      return next(createError(403, "User not authenticated!"));
    }

    const decodedData = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = auth;
