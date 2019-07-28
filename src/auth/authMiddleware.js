import jwt from "jsonwebtoken";

const { PRIVATE_KEY } = process.env;

export function requireAuthentication(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, PRIVATE_KEY);

    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
}
