"use strict";
const express = require("express");
const StoreKnex = require("../services").get("knex1");
const {
  languageList,
  toneList,
  useCaseList,
  useCaseDetail,
  ryte,
  usage,
} = require("../modules/rytr");

const { authUser } = require("@es-labs/node/auth");

module.exports = express
  .Router()

  .get("/", async (req, res) => {
    try {
      return res.json({ message: "test..." });
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .get("/language-list", async (req, res) => {
    try {
      const getLang = await languageList();

      return res.json(getLang);
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .get("/tone-list", async (req, res) => {
    try {
      const getTones = await toneList();

      return res.json(getTones);
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .get("/use-case/list", async (req, res) => {
    try {
      const getUseCase = await useCaseList();

      return res.json(getUseCase);
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .get("/use-case/:useCaseId", async (req, res) => {
    try {
      const { useCaseId } = req.params;
      console.log("id:", useCaseId);
      const getUseCaseDetail = await useCaseDetail({ useCaseId });

      return res.json(getUseCaseDetail);
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .get("/usage", async (req, res) => {
    try {
      const getUsage = await usage();

      return res.json(getUsage);
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .get("/lyric-list", authUser, async (req, res) => {
    try {
      const { id } = req.decoded;

      const getLyricsByUserId = await StoreKnex.knex("lyrics")
        .where("userId", id)
        .whereNull("deletedAt");

      return res.json(getLyricsByUserId);
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .post("/ryte", async (req, res) => {
    try {
      const payload = req.body;
      const ryteData = {
        languageId: "607adac76f8fe5000c1e636d",
        toneId: payload.tone,
        useCaseId: "60e6f4316ab0b5000c848c51",
        inputContexts: {
          SONG_IDEA_LABEL: payload.prompt,
        },
      };
      const generateRyte = await ryte(ryteData);

      return res.json(generateRyte);
      // return res.json({ message: 'ryted' })
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .post("/save", authUser, async (req, res) => {
    try {
      console.log(req.body);
      const data = req.body;
      console.log(req.decoded);
      const { id } = req.decoded;

      const checkDuplicateLyricName = await StoreKnex.knex("lyrics")
        .where("userId", id)
        .andWhere("name", data.name)
        .whereNull("deletedAt")
        .first();

      if (checkDuplicateLyricName) {
        // throw new Error(
        //   `Name of "${data.name}" already used. Please use a different name.`
        // );
        return res.status(500).json({
          message: `Name ${data.name} already in use. Please use a different name`,
        });
      }

      const saveLyric = await StoreKnex.knex("lyrics").insert({
        createdAt: new Date(),
        userId: id,
        name: data.name,
        ryte: data.ryte,
      });
      return res.json({
        message: `${data.name} lyric saved successfully.`,
      });
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .post("/edit", authUser, async (req, res) => {
    try {
      const { id: userId } = req.decoded;
      const { id, newName } = req.body;

      const checkDuplicateLyricName = await StoreKnex.knex("lyrics")
        .where("userId", userId)
        .andWhere("name", newName)
        .whereNull("deletedAt")
        .first();

      if (checkDuplicateLyricName) {
        return res.status(500).json({
          message: `Name ${newName} already in use. Please use a different name`,
        });
      }

      await StoreKnex.knex("lyrics")
        .update({
          name: newName,
          updatedAt: new Date(),
        })
        .where("id", id)
        .andWhere("userId", userId);

      return res.json({
        message: "Successfully edited lyric.",
      });
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .post("/delete", authUser, async (req, res) => {
    try {
      const { id } = req.decoded;
      const { lyrics } = req.body;

      const lyricIds = lyrics.map((item) => {
        return item.id;
      });

      await StoreKnex.knex("lyrics")
        .update({
          deletedAt: new Date(),
        })
        .whereIn("id", lyricIds)
        .andWhere("userId", id);

      return res.json({
        message: "Successfully deleted lyrics.",
      });
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  });
