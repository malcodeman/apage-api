import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./auth/authRoutes";
import pagesRoutes from "./pages/pagesRoutes";

const { PORT, MONGODB_URI } = process.env;
const app = express();

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);

app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/pages", pagesRoutes);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
