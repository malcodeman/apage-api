import User from "./users_model";

export async function findUserById(id) {
  const user = await User.findById(id, "pages");

  if (user) {
    return user;
  } else {
    throw new Error("UserNotFoundException");
  }
}

export async function findPageByDomain(domain) {
  const user = await User.findOne({ "pages.domain": domain }, "pages");

  if (user) {
    const page = user.pages.find(page => page.domain === domain);

    return page;
  } else {
    throw new Error("PageNotFoundException");
  }
}

export async function setPageField(domain, field, value) {
  const user = await User.findOneAndUpdate(
    { [`pages.domain`]: domain },
    { $set: { [`pages.$.${field}`]: value } },
    { new: true, select: `pages.${field}` }
  );

  if (user) {
    return user.pages.find(obj => obj[field] === value);
  } else {
    throw new Error("NotFoundException");
  }
}

export async function pushPageField(domain, field, value) {
  const user = await User.findOneAndUpdate(
    { [`pages.domain`]: domain },
    { $push: { [`pages.$.${field}`]: value } },
    { new: true, select: `pages.${field}` }
  );

  if (user) {
    const length = user.pages[0][field].length;

    return user.pages[0][field][length - 1];
  } else {
    throw new Error("NotFoundException");
  }
}

export async function pullPageField(domain, field, id) {
  const user = await User.findOneAndUpdate(
    { [`pages.domain`]: domain },
    { $pull: { [`pages.$.${field}`]: { id: id } } },
    { select: `pages.${field}` }
  );

  if (user) {
    const pulledField = user.pages[0][field].find(field => field.id === id);

    return pulledField;
  } else {
    throw new Error("NotFoundException");
  }
}

export async function pushPage(userId, newPage) {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $push: { pages: newPage }
    },
    { new: true, select: "pages" }
  );

  if (user) {
    return user.pages[user.pages.length - 1];
  } else {
    throw new Error("NotFoundException");
  }
}

export default {
  findUserById,
  findPageByDomain,
  setPageField,
  pushPageField,
  pullPageField,
  pushPage
};
