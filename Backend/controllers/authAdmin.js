const jwt = require("jsonwebtoken");
//solve decodetoken issues here.

const errorMessage=(res) => {
  return res.status(401).json({
    status: "fail",
    message: "Authorization denied, user is not logged in.",
  });
}

const authAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) { 
      return errorMessage(res);
    }

    const verified = jwt.verify(token,"saim");
    if (!verified) {
      return errorMessage(res);
    }
    
    req.user = verified.id;
    next();
  } catch (error) {
    return errorMessage(res);
  }
};

module.exports = authAdmin;
