import jwt from "jsonwebtoken";

export function requireAuthentication(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "secret");

    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
}
