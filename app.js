import express, { Router } from "express";
import route1 from "./route/1route.js";
import db from "./model/index.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(route1);

app.listen(3000, () => {
  console.log("app is running at 3000");
});
