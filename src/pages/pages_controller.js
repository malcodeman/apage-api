import nanoid from "nanoid";

import User from "../users/users_model";

export async function create(req, res, next) {
  try {
    const userId = req.userId;
    const {
      template,
      title,
      name,
      tagline,
      location,
      cta_button_text,
      cta_button_link
    } = req.body;
    const newPage = {
      id: nanoid(),
      domain: nanoid(),
      createdAt: Date.now(),
      template,
      title,
      name,
      tagline,
      location,
      cta_button_text,
      cta_button_link
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

export async function updateDomain(req, res, next) {
  try {
    const { domain } = req.params;
    const userId = req.userId;
    const user = await User.findOne({ "pages.domain": domain }, "pages");

    if (user) {
      const pages = user.pages.map(page => {
        if (page.domain === domain) {
          const { domain } = req.body;

          return {
            ...page,
            domain
          };
        }
        return page;
      });
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          pages
        },
        { new: true, select: "pages" }
      );
      const updatedPage = pages.find(page => page.domain === req.body.domain);

      res.status(200).send({ oldDomain: domain, domain: updatedPage.domain });
    } else {
      res.status(404).send({ exception: "PageNotFoundException" });
    }
  } catch (error) {
    res.status(400).send({ exception: "general", error });
  }
}

export async function update(req, res, next) {
  try {
    const { domain } = req.params;
    const userId = req.userId;
    const user = await User.findOne({ "pages.domain": domain }, "pages");

    if (user) {
      const pages = user.pages.map(page => {
        if (page.domain === domain) {
          const {
            name,
            tagline,
            location,
            cta_button_text,
            cta_button_link
          } = req.body;

          return {
            ...page,
            name,
            tagline,
            location,
            cta_button_text,
            cta_button_link
          };
        }
        return page;
      });
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          pages
        },
        { new: true, select: "pages" }
      );
      const updatedPage = pages.find(page => page.domain === domain);

      res.status(200).send(updatedPage);
    } else {
      res.status(404).send({ exception: "PageNotFoundException" });
    }
  } catch (error) {
    res.status(400).send({ exception: "general", error });
  }
}

export async function getPages(req, res, next) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId, "pages");

    res.status(200).send(user.pages);
  } catch (error) {
    res.status(400).send({ exception: "general", error });
  }
}

export async function getPage(req, res, next) {
  try {
    const { domain } = req.params;
    const user = await User.findOne({ "pages.domain": domain }, "pages");

    if (user) {
      const page = user.pages.find(page => page.domain === domain);

      res.status(200).send(page);
    } else {
      res.status(404).send({ exception: "PageNotFoundException" });
    }
  } catch (error) {
    res.status(400).send({ exception: "general", error });
  }
}
