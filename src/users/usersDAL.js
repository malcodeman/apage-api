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

export default {
  findUserById,
  findPageByDomain
};
