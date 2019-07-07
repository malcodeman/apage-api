import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import auth_routes from "./auth/auth_routes";
import pages_routes from "./pages/pages_routes";

const { PORT, MONGODB_URI } = process.env;
const app = express();

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use("/api/auth", auth_routes);
app.use("/api/pages", pages_routes);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
