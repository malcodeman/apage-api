import User from "./users_model";

export async function create(email, password) {
  const user = await User.create({ email, password });

  if (user) {
    return { id: user.id, email: user.email, createdAt: user.createdAt };
  } else {
    throw new Error("CanNotCreateUserException");
  }
}

export async function findUser(email) {
  const user = await User.findOne({ email }, "id email password createdAt");

  if (user) {
    return user;
  } else {
    throw new Error("UserNotFoundException");
  }
}

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

export async function setPageField(domain, field) {
  const key = Object.keys(field)[0];
  const value = Object.values(field)[0];
  const user = await User.findOneAndUpdate(
    { [`pages.domain`]: domain },
    { $set: { [`pages.$.${key}`]: value } },
    { new: true, select: `pages.${key}` }
  );

  if (user) {
    return user.pages.find(obj => obj[key] === value);
  } else {
    throw new Error("NotFoundException");
  }
}

export async function setPageFields(domain, fields) {
  const obj = {};

  for (let [key, value] of Object.entries(fields)) {
    obj[`pages.$.${key}`] = value;
  }

  const user = await User.findOneAndUpdate(
    { [`pages.domain`]: domain },
    { $set: obj },
    { new: true, select: "pages" }
  );

  if (user) {
    return user.pages.find(page => page.domain === domain);
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
  create,
  findUser,
  findUserById,
  findPageByDomain,
  setPageField,
  setPageFields,
  pushPageField,
  pullPageField,
  pushPage
};
