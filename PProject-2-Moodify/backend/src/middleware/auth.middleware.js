const blackListModel = require("../models/blacklist.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({
      message: "Token not Found",
    });
  }

  const tokenblacklisted = await blackListModel.findOne({
    token,
  });

  if (tokenblacklisted) {
    return res.status(400).json({
      message: "Token is BlackListed",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    // console.error("Error in MiddleWare : ", error);
    res.status(400).json({
      message: "Error : Invalid Token",
      error,
    });
  }
}

module.exports = authMiddleware;
