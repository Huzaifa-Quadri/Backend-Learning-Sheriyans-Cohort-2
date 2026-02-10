const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies["jwt-token"];

    // console.log(req.cookies);

    if (!token) {
      return res.status(401).json({
        message: "Access Denied, You need to Login First",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded : ", decoded);

    req.user = decoded;

    next();
  } catch (e) {
    return res.status(401).json({
      message: "From Middleware : Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
