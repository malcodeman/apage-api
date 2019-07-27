import jwt from "jsonwebtoken";
import argon from "argon2";

import User from "../users/users_model";
import usersDAL from "../users/usersDAL";

export async function signup(req, res, next) {
  try {
    const { email, password } = req.body;

    const hash = await argon.hash(password);
    const user = await usersDAL.create(email, hash);
    const token = jwt.sign({ id: user._id }, "secret", {
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
    const user = await User.findOne({ email });

    if (user === null) {
      res.status(400).send({ exception: "UserNotFoundException" });
      return;
    }
    if (await argon.verify(user.password, password)) {
      const token = jwt.sign({ id: user.id }, "secret", {
        expiresIn: 86400
      });

      res.status(200).send({ token, user });
    } else {
      res.status(400).send({ exception: "NotAuthorizedException" });
    }
  } catch (error) {
    res.status(400).send({ exception: "general", error });
  }
}
