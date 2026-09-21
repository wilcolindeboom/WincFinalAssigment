//todo: edit this file to use the correct client_id, client_secret, and audience for your Auth0 application
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  if (!token) {
    return res.status(401).json({ message: "You cannot access this operation without a token!" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    console.log("Decoded token:", decoded); // Log the decoded token for debugging
    console.log("token:", token); // Log the token for debugging
    if (err) {
      return res.status(403).json({ message: "Invalid token provided!" });
    }

    req.user = decoded;
    next();
  });
};

export default authMiddleware;
