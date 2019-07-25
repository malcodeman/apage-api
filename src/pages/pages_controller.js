import nanoid from "nanoid";

import User from "../users/users_model";
import usersDAL from "../users/usersDAL";
import { DEFAULT_CARD_PAGE } from "./pagesConstants";

export async function create(req, res, next) {
  try {
    const { template } = req.body;
    const userId = req.userId;

    if (template === DEFAULT_CARD_PAGE.template) {
      const page = await usersDAL.pushPage(userId, DEFAULT_CARD_PAGE);

      res.status(200).send(page);
    } else {
      throw new Error("TemplateNotFound");
    }
  } catch (error) {
    res.status(400).send({ message: error.message, stack: error.stack });
  }
}

export async function updateDomain(req, res, next) {
  try {
    const { domain } = req.params;
    const updatedField = await usersDAL.setPageField(
      domain,
      "domain",
      req.body.domain
    );

    res.status(200).send({ oldDomain: domain, domain: updatedField.domain });
  } catch (error) {
    res.status(400).send({ message: error.message, stack: error.stack });
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
            ctaButtonText,
            ctaButtonLink
          } = req.body;

          return {
            ...page,
            name,
            tagline,
            location,
            ctaButtonText,
            ctaButtonLink
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

export async function updateMainImage(req, res, next) {
  try {
    const { domain } = req.params;
    const updatedField = await usersDAL.setPageField(
      domain,
      "mainImageURL",
      req.body.mainImageURL
    );

    res.status(200).send(updatedField);
  } catch (error) {
    res.status(400).send({ message: error.message, stack: error.stack });
  }
}

export async function updateProfileImage(req, res, next) {
  try {
    const { domain } = req.params;
    const updatedField = await usersDAL.setPageField(
      domain,
      "profileImageURL",
      req.body.profileImageURL
    );

    res.status(200).send(updatedField);
  } catch (error) {
    res.status(400).send({ message: error.message, stack: error.stack });
  }
}

export async function addSocialLink(req, res, next) {
  try {
    const { domain } = req.params;
    const { url } = req.body;
    const id = nanoid();
    const updatedField = await usersDAL.pushPageField(domain, "socialLinks", {
      id,
      url
    });

    res.status(200).send(updatedField);
  } catch (error) {
    res.status(400).send({ message: error.message, stack: error.stack });
  }
}

export async function removeSocialLink(req, res, next) {
  try {
    const { domain, linkId } = req.params;
    const userId = req.userId;
    const pulledField = await usersDAL.pullPageField(
      domain,
      "socialLinks",
      linkId
    );

    res.status(200).send({ linkId: pulledField.id });
  } catch (error) {
    res.status(400).send({ message: error.message, stack: error.stack });
  }
}

export async function getPages(req, res, next) {
  try {
    const userId = req.userId;
    const user = await usersDAL.findUserById(userId);

    res.status(200).send(user.pages);
  } catch (error) {
    const message = error.message;
    const stack = error.stack;

    if (message === "UserNotFoundException") {
      res.status(404).send({
        exception: "UserNotFoundException",
        message,
        stack
      });
      return;
    }
    res.status(400).send({ exception: "General", message, stack });
  }
}

export async function getPage(req, res, next) {
  try {
    const { domain } = req.params;
    const page = await usersDAL.findPageByDomain(domain);

    res.status(200).send(page);
  } catch (error) {
    const message = error.message;
    const stack = error.stack;

    if (message === "PageNotFoundException") {
      res.status(404).send({
        exception: "PageNotFoundException",
        message,
        stack
      });
      return;
    }
    res.status(400).send({ exception: "General", message, stack });
  }
}
