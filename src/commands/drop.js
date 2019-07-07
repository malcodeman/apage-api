import mongoose from "mongoose";

import User from "../users/users_model";
import log from "./log";

const { MONGODB_URI } = process.env;

async function drop() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true
    });
    const count = await User.countDocuments({});

    await mongoose.connection.db.dropDatabase();

    log(`Dropped database\nRemoved ${count} users`);
    process.exit();
  } catch (error) {
    log(error);
    process.exit(1);
  }
}

drop();
