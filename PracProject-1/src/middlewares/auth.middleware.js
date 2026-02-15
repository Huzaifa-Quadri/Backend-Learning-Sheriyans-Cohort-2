const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({
        message: "Token Not Found ! Login",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user to request (VERY IMPORTANT)
    req.user = {
      id: decoded.id,
    };

    // 4. Continue request lifecycle
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Expired or Invalid Token",
    });
  }
}

module.exports = authentication;
