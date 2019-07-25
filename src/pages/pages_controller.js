import nanoid from "nanoid";

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
    const updatedField = await usersDAL.setPageField(domain, {
      domain: req.body.domain
    });

    res.status(200).send({ oldDomain: domain, domain: updatedField.domain });
  } catch (error) {
    res.status(400).send({ message: error.message, stack: error.stack });
  }
}

export async function update(req, res, next) {
  try {
    const { domain } = req.params;
    const fields = {
      name: req.body.name,
      tagline: req.body.tagline,
      location: req.body.location,
      ctaButtonText: req.body.ctaButtonText,
      ctaButtonLink: req.body.ctaButtonLink
    };
    const updatedPage = await usersDAL.setPageFields(domain, fields);

    res.status(200).send(updatedPage);
  } catch (error) {
    res.status(400).send({ message: error.message, stack: error.stack });
  }
}

export async function updateMainImage(req, res, next) {
  try {
    const { domain } = req.params;
    const updatedField = await usersDAL.setPageField(domain, {
      mainImageURL: req.body.mainImageURL
    });

    res.status(200).send(updatedField);
  } catch (error) {
    res.status(400).send({ message: error.message, stack: error.stack });
  }
}

export async function updateProfileImage(req, res, next) {
  try {
    const { domain } = req.params;
    const updatedField = await usersDAL.setPageField(domain, {
      profileImageURL: req.body.profileImageURL
    });

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
