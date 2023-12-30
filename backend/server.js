import express from "express";
import helmet from 'helmet'
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 4000;

const app = express();

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(port, () => console.log(`Server started on port ${port}`));
