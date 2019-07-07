import nanoid from "nanoid";

import User from "../users/users_model";

export async function create(req, res, next) {
  try {
    const userId = req.userId;
    const { template, title } = req.body;
    const newPage = {
      id: nanoid(),
      domain: nanoid(),
      createdAt: Date.now(),
      template,
      title
    };
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { pages: newPage }
      },
      { new: true, select: "pages" }
    );
    const lastPage = user.pages[user.pages.length - 1];

    res.status(200).send(lastPage);
  } catch (error) {
    res.status(400).send({ exception: "general", error });
  }
}

export async function get(req, res, next) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId, "pages");

    res.status(200).send(user.pages);
  } catch (error) {
    res.status(400).send({ exception: "general", error });
  }
}
