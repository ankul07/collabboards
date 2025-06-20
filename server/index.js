import dotenv from "dotenv";
import path from "path";
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
}
import express from "express";
const app = express();
import cors from "cors";
const PORT = process.env.PORT;
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import connectDatabase from "./config/db.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/test", (req, res) => {
  res.send("<h1>backend bindass working</h1>");
});

import userRoutes from "./routes/user.route.js";
app.use(userRoutes);

app.use(globalErrorHandler);
connectDatabase();
app.listen(PORT, () => {
  console.log(
    `the bckend running succesfully on this port number http://localhost:${PORT}`
  );
});
