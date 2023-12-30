import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const port = process.env.PORT || 4000;

const app = express();
app.use("/api/users", userRoutes);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Server started on port ${port}`));
