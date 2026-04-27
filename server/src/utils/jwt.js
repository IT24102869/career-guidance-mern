import jwt from "jsonwebtoken";

export function signToken(user) {
  const payload = { sub: user._id.toString(), email: user.email, name: user.name };
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is missing from process.env");
    throw new Error("JWT_SECRET is not set in environment variables");
  }
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is missing from process.env");
    throw new Error("JWT_SECRET is not set in environment variables");
  }
  return jwt.verify(token, secret);
}
