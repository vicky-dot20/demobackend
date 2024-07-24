import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import signup from "./routes/signup";
import signin from "./routes/signin";
import connectToMongoDB from './config/databse';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(bodyParser.json());
connectToMongoDB();
app.use(cors());
const base = "/demo";

app.use(base, signup);
app.use(base, signin);

const port = 4000;

app.listen(port).on(
    "listening", () => {
        console.log(`Listening on http://localhost:${port} `);
    }
)