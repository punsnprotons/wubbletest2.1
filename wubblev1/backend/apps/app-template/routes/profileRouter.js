"use strict";
const { authUser } = require("@es-labs/node/auth");
const express = require("express");
const StoreKnex = require("../services").get("knex1");
const bcrypt = require("bcryptjs");

module.exports = express
  .Router()
  .get("/", authUser, async (req, res) => {
    try {
      const user = await StoreKnex.knex("user")
        .where({ id: req.decoded.id })
        .first();
      return res.json({
        name: user.firstName + " " + user.lastName,
        email: user.email,
        id: user.id,
      });
    } catch (e) {
      return res.status(500).json({ message: e.toString() });
    }
  })

  .post("/", authUser, async (req, res) => {
    const { currentPassword, newPassword, name } = req.body;
    try {
      if (!name || !currentPassword || !newPassword) {
        return res.status(500).json({ message: "All fields are required." });
      }

      // 1. cek current password
      const user = await StoreKnex.knex("authentication_method")
        .where({ userId: req.decoded.id })
        .first();
      if (!user) {
        return res.status(500).json({ message: "User not found." });
      }

      if (!bcrypt.compareSync(currentPassword, user.passwordHash)) {
        return res.status(500).json({ message: "Wrong password." });
      }

      // 2. update password
      const newHashPassword = bcrypt.hashSync(newPassword, 12);
      await StoreKnex.knex("authentication_method")
        .update({
          passwordHash: newHashPassword,
        })
        .where({ userId: req.decoded.id });

      // 3. update name
      let tempName = name.split(" ");
      let firstName = tempName[0];
      let lastName = tempName.slice(1).join(" ");
      await StoreKnex.knex("user")
        .update({
          firstName,
          lastName,
        })
        .where({ id: req.decoded.id });

      return res.json({
        message: "Profile updated successfully.",
      });
    } catch (e) {
      return res.status(500).json({ message: e.toString() });
    }
  });
