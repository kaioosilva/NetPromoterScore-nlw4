import "reflect-metadata";
import express from "express";
import createConnection from "./database";
import { router } from "./routes";

createConnection();
const app = express();

//Inform we're using JSON format.
app.use(express.json());
app.use(router);

export { app };
