"use strict";
const express = require("express");
const StoreKnex = require("../services").get("knex1");
const {
  checkEmailDuplication,
  isUserEmailExists,
  saveResetPasswordToken,
} = require("../modules/functions");
const { authUser } = require("@es-labs/node/auth");
const { sendResetPassword } = require("../modules/email");
const { VITE_WWW_URL } = global.CONFIG;
const bcrypt = require("bcryptjs");

module.exports = express
  .Router()
  .post("/sign-up", async (req, res) => {
    try {
      const body = req.body;

      const checkEmail = await checkEmailDuplication(body.email);

      if (!checkEmail) {
        return res.status(500).json({ message: "Email already registered." });
      }

      await StoreKnex.knex("customer").insert({
        email: body.email,
        createdAt: new Date(),
      });

      return res.json({ message: "Successfully registered an email." });
    } catch (e) {
      return res.status(500).json({ message: e.toString() });
    }
  })

  .get("/session", authUser, async (req, res) => {
    try {
      let { id, email } = req.decoded;

      let user = await StoreKnex.knex("user").where({ id, email }).first();

      return res.json({ message: "session ok", role: user.role });
    } catch (e) {
      return res.status(500).json({ message: e.toString() });
    }
  })

  .post("/request-reset-password", async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email);
      // 1. email check
      const isEmailExists = await isUserEmailExists(req.body.email);
      if (!isEmailExists) {
        return res.status(500).json({ message: "Email not found." });
      }
      // 2. generate token + save to database
      let token = new Buffer.from(Date.now() / 1000 + email, "utf8").toString(
        "hex"
      );
      token = token.slice(0, Math.ceil(token.length / 2));
      let url = `${VITE_WWW_URL}/forgot-password/${token}/edit`;

      const saveToken = await saveResetPasswordToken(email, token);
      if (!saveToken) {
        return res.status(500).json({ message: "Something went wrong." });
      }
      // 3. kirim ke email domain/reset-password?token=tokennya
      const user = await StoreKnex.knex("user").where("email", email).first();
      const name = user.firstName + " " + user.lastName;
      await sendResetPassword("Reset Password", name, email, url);

      // 4. dihalaman reset-password onMounted fetch api tokennya valid apa engga
      // 5. baru ganti password

      return res.json({
        message: "Reset password email sent. Please check your email",
      });
    } catch (e) {
      return res.status(500).json({ message: e.toString() });
    }
  })

  .get("/request-reset-password/:token", async (req, res) => {
    try {
      const token = req.params.token;
      const user = await StoreKnex.knex("authentication_method")
        .where({ passwordResetToken: token })
        .first();
      if (!user) {
        return res.status(400).json({ error: "User Not Found" });
      }
      return res.json({ message: "Token Valid", email: user.identifier });
    } catch (e) {
      return res.status(500).json({ message: e.toString() });
    }
  })

  .post("/reset-password", async (req, res) => {
    try {
      const { email, token, password } = req.body;
      // 1. check email and token
      const user = await StoreKnex.knex("authentication_method")
        .where("identifier", email)
        .first();
      if (!user) {
        return res.status(400).json({ error: "User Not Found" });
      }

      if (user.passwordResetToken !== token) {
        return res.status(400).json({ error: "Invalid Token" });
      }

      // 2. update password
      let newHashedPassword = bcrypt.hashSync(password, 12);
      await StoreKnex.knex("authentication_method")
        .update({ passwordHash: newHashedPassword, passwordResetToken: null })
        .where("identifier", email);
      return res.json({ message: "New Password Successfully Changed" });
    } catch (e) {
      return res.status(500).json({ message: e.toString() });
    }
  });
