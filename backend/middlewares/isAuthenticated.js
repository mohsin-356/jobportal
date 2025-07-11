import jwt, { decode } from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access", success: false });
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    // console.log("Decoded JWT:", decoded);
    if (!decoded)
    {
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: false });
    }
    req.id = decoded.userId; // Assuming the token contains userId
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};
export default isAuthenticated;
