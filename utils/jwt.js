import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "rahasia";

export function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}
