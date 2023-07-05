import express from "express";
import connectToMongo from "./db.js";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/news.js";

const app = express();

app.use(cors());

// to deal requests in json format
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

connectToMongo();

const port = 5000;

// Available routes
app.use("", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
