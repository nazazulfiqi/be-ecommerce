import { verifyToken } from "../utils/jwt.js";
import ResponseDTO from "../dto/response.dto.js";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json(ResponseDTO.error("Unauthorized: Token not provided", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // user: { id, email, role, ... }
    next();
  } catch (err) {
    return res.status(401).json(ResponseDTO.error("Invalid token", 401));
  }
}

export function authorizeRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json(ResponseDTO.error("Forbidden: Insufficient role", 401));
    }
    next();
  };
}
