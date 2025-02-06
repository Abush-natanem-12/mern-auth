import jwt from "jsonwebtoken";

const userAuth = async function (req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Unauthorized login again" });
  }
  try {
    const tokenCode = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenCode.id) {
      return res.json({ success: false, message: "Unauthorized login again" });
    }

    req.body.userId = tokenCode.id;

    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "something went wrong in the middle ware",
    });
  }
};

export default userAuth;
