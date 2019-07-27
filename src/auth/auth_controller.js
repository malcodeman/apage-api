import jwt from "jsonwebtoken";
import argon from "argon2";

import usersDAL from "../users/usersDAL";

export async function signup(req, res, next) {
  try {
    const { email, password } = req.body;

    const hash = await argon.hash(password);
    const user = await usersDAL.create(email, hash);
    const id = user.id;
    const token = jwt.sign({ id }, "secret", {
      expiresIn: 86400
    });

    res.status(200).send({ token, user });
  } catch (error) {
    res.status(400).send({ message: error.message, stack: error.stack });
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await usersDAL.findUser(email);

    if (await argon.verify(user.password, password)) {
      const id = user.id;
      const token = jwt.sign({ id }, "secret", {
        expiresIn: 86400
      });

      res.status(200).send({
        token,
        user: { id, email: user.email, createdAt: user.createdAt }
      });
    } else {
      throw new Error("NotAuthorizedException");
    }
  } catch (error) {
    res.status(400).send({ message: error.message, stack: error.stack });
  }
}
