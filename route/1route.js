import { Router } from "express";
import db from "../model/index.js";
import bcr from "bcryptjs";
import { where } from "sequelize";

const route1 = Router();
route1
  .route("/")
  .get((req, res) => {
    res.render("register");
  })
  .post(async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.send("please enter email,username, and password");
    }
    const emailvalidation = await db.users.findAll({ where: { Email: email } });
    if (emailvalidation.length > 0) {
      res.send("email is already register ");
    } else {
      await db.users.create({
        Email: email,
        userName: username,
        password: bcr.hashSync(password, 12),
      });
      res.redirect("/login");
    }
  });

route1.route("/submit").get((req, res) => {
  res.render("thankyou");
});
route1
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    //check email is existing or not
    const userExists = await db.users.findAll({
      where: {
        Email: email,
      },
    });
    if (userExists.length > 0) {
      //check password is correct or not
      const isMatch = bcr.compareSync(password, userExists[0].password);
      if (isMatch) {
        res.send("login sucessfully");
      } else {
        res.send("Invalid Email or Password");
      }
    } else {
      return res.send("Invalid Email or Password");
    }
  });
export default route1;
