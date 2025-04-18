import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { User } from "../models/user.model.js";
import ResponseDTO from "../dto/response.dto.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(409).json(ResponseDTO.conflict("Email already used"));

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    return res.status(201).json(ResponseDTO.success("Registered successfully"));
  } catch (err) {
    return res.status(500).json(ResponseDTO.error(err.message));
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json(ResponseDTO.error("Invalid email or password", 401));
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json(ResponseDTO.error("Invalid password", 401));
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return res.json(ResponseDTO.success("Login successfully", { token }));
  } catch (err) {
    return res.status(500).json(ResponseDTO.error(err.message));
  }
};
