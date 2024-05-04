"use strict";
const express = require("express");
const StoreKnex = require("../services").get("knex1");
const { generateReplicate, getModel } = require("../modules/replicate");
const {
  modelVersion,
  normalizationStrategy,
  outputFormat,
  randomMilliomNumber,
} = require("../constants/index");
const { authUser } = require("@es-labs/node/auth");
const multer = require("multer");
const Https = require("https");
const Fs = require("fs");
const { putBuffer, getReadURL, deleteFile } = require("../services/aliyunOSS");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require("uuid");
const path = require('path');

async function downloadFile(url, targetFile) {
  return await new Promise((resolve, reject) => {
    Https.get(url, (response) => {
      const code = response.statusCode ?? 0;

      if (code >= 400) {
        return reject(new Error(response.statusMessage));
      }

      // handle redirects
      if (code > 300 && code < 400 && !!response.headers.location) {
        return resolve(downloadFile(response.headers.location, targetFile));
      }

      // save the file to disk
      const fileWriter = Fs.createWriteStream(targetFile).on("finish", () => {
        resolve({});
      });

      response.pipe(fileWriter);
    }).on("error", (error) => {
      reject(error);
      console.log("error download:", error);
    });
  });
}

async function readDownloadFile(filePath) {
  console.log("reading downloaded file...");
  let result;
  await new Promise((resolve, reject) => {
    try {
      Fs.readFile(filePath, (err, data) => {
        console.log("readFile:", data);
        if (err) {
          console.log("err readFile:", err);
          return;
        } else {
          result = data;
          resolve(() => {
            return result;
          });
        }
      });

      return result;
    } catch (error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
      reject(error);
      return false;
    }
  });

  return result;
}

module.exports = express
  .Router()
  .get("/", async (req, res) => {
    try {
      // const test = await generateReplicate()
      // const test = await generateReplicate()
      // console.log('test:', test)
      console.log("randomMilliomNumber:", randomMilliomNumber);

      return res.json({ message: "replicate main router ok" });
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .get("/model-version", async (req, res) => {
    try {
      console.log("modelVersion:", modelVersion);

      return res.json(modelVersion);
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .get("/normalization-strategy", async (req, res) => {
    try {
      console.log("normalizationStrategy:", normalizationStrategy);

      return res.json(normalizationStrategy);
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .get("/output-format", async (req, res) => {
    try {
      console.log("outputFormat:", outputFormat);

      return res.json(outputFormat);
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  // .get('/genre-url/:ossFileName', authUser, async (req, res) => {
  .get("/genre-url/:ossFileName", async (req, res) => {
    try {
      const { ossFileName } = req.params;

      // TBD read - local file
      let url = '';
      const hostname = req.headers.host;
      url = `${hostname}/uploads/genre/${ossFileName}`;

      if (global.CONFIG.OSS_BUCKET.includes('wubble-fs-master')) {
        url = `https://${url}`
      } else {
        url = `http://${url}`
      }

      return res.json({
        url,
      });
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .post(
    "/generate",
    upload.fields([{ name: "file", maxCount: 1 }]),
    authUser,
    async (req, res) => {
      try {
        const data = JSON.parse(req.body.body);
        let files = req.files;

        let generate;
        let dataURI;

        if (files.file) {
          const base64 = new Buffer.from(files.file[0].buffer).toString(
            "base64"
          );

          if (files.file[0].mimetype.includes("audio/mpeg")) {
            dataURI = `data:audio/mpeg;base64,${base64}`;
          } else {
            dataURI = `data:audio/wav;base64,${base64}`;
          }
          generate = await generateReplicate(data.prompt, dataURI);
        } else {
          generate = await generateReplicate(data.prompt);
        }

        let ossFileName;
        let ossAudioUrl;

        if (generate) {
          const targetFile = "my-music.wav";
          const audioUrl = generate;

          await downloadFile(audioUrl, targetFile);

          const bufferedFile = await readDownloadFile(targetFile);

          const filename = `${uuidv4()}.wav`;
          ossFileName = filename

          // TBD: save to local file...
          const folderPath = path.join(__dirname, '..', 'uploads', 'genre');

          if (!Fs.existsSync(folderPath)) {
            Fs.mkdirSync(folderPath);
          }

          const filePath = path.join(__dirname, '..', 'uploads', 'genre', filename)

          Fs.writeFileSync(filePath, bufferedFile);
        }

        return res.json({
          message: "Successfully generated a genre.",
          result: ossFileName,
        });
      } catch (e) {
        console.log("error generating:", e);
        return res.status(500).json({ message: e.toString() });
      }
    }
  )

  .get("/genre-list", authUser, async (req, res) => {
    // .get('/genre-list', async (req, res) => {
    try {
      const { id } = req.decoded;

      const getGenreListByUserId = await StoreKnex.knex("genre")
        .where("userId", id)
        .whereNull("deletedAt");

      return res.json(getGenreListByUserId);
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .post("/save", authUser, async (req, res) => {
    try {
      const data = req.body;

      const { id } = req.decoded;

      const checkDuplicateGenreName = await StoreKnex.knex("genre")
        .where("userId", id)
        .andWhere("name", data.name)
        .whereNull("deletedAt")
        .first();

      if (checkDuplicateGenreName) {
        // throw new Error(`Name of "${data.name}" already used.`)
        return res.status(500).json({
          message: `Name ${data.name} already in use. Please use a different name`,
        });
      }

      const saveGenre = await StoreKnex.knex("genre").insert({
        createdAt: new Date(),
        userId: id,
        name: data.name,
        ossFileName: data.ossFileName,
      });

      return res.json({
        message: "Successfully saved a generated genre.",
      });
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  // .post('/delete/unsave-file', authUser, async (req, res) => {
  .post("/delete/unsave-file", async (req, res) => {
    try {
      const data = req.body;

      // TBD delete local
      // fs.unlink
      const filePath = path.join(__dirname, '..', 'uploads', 'genre', data.fileName)
    
      Fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted successfully');
      });

      return res.json({
        message: "Successfully deleted a file.",
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

      const checkDuplicateGenreName = await StoreKnex.knex("genre")
        .where("userId", userId)
        .andWhere("name", newName)
        .whereNull("deletedAt")
        .first();

      if (checkDuplicateGenreName) {
        return res.status(500).json({
          message: `Name ${newName} already in use. Please use a different name`,
        });
      }

      await StoreKnex.knex("genre")
        .update({
          name: newName,
          updatedAt: new Date(),
        })
        .where("id", id)
        .andWhere("userId", userId);

      return res.json({
        message: "Successfully edited genre.",
      });
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  })

  .post("/delete", authUser, async (req, res) => {
    try {
      const { id } = req.decoded;
      const { genres } = req.body;

      const genreIds = genres.map((item) => {
        return item.id;
      });

      await StoreKnex.knex("genre")
        .update({
          deletedAt: new Date(),
        })
        .whereIn("id", genreIds)
        .andWhere("userId", id);

      return res.json({
        message: "Successfully deleted genres.",
      });
    } catch (e) {
      console.log("error:", e);
      return res.status(500).json({ message: e.toString() });
    }
  });
