const { verify } = require("jsonwebtoken");

 const validateToken = (req, res, next) => {
  const accessToken =req.header("auth-token");
  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    console.log( "tet:" , err)
    return res.json({ error: err });
  }
};

module.exports = validateToken 