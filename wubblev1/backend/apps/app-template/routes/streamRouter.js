const express = require("express");
const { 
  connectStream,
  startStream,
  sendStreamContent,
  onIceCandidate, } = require('../modules/did')

module.exports = express.Router()
  .get("/avatar", async (req, res) => {
    try {
      console.log('/avatar')
      const response = await connectStream();
      return res.status(201).json({ data: response });
    } catch (error) {
      console.log("error", error)
      return res.status(500).json({message: error.toString()})
    }
  })

  .post("/start", async (req, res) => {
    try {
      console.log('/start')
      const { streamId, sessionClientAnswer, sessionId } = req.body;
      const response = await startStream(
        streamId,
        sessionClientAnswer,
        sessionId
      );
      res.status(201).json({ data: response.data });
    } catch (error) {
      console.log(error);
    }
  })

  // what content that avatar will read
  .post("/talks", async (req, res) => {
    try {
      const { inputText, streamId, sessionId, language = 'english' } = req.body;
      const response = await sendStreamContent(
        inputText,
        streamId,
        sessionId,
        language
      );
      res.status(201).json({ data: response.data });
    } catch (error) {
      console.log(error);
    }
  })

  .post("/ice", async (req, res) => {
    try {
      const { streamId, candidate, sdpMid, sdpMLineIndex, sessionId } =
        req.body;
      const response = await onIceCandidate(
        streamId,
        candidate,
        sdpMid,
        sdpMLineIndex,
        sessionId
      );
      res.status(201).json({ data: response });
    } catch (error) {
      console.log(error);
    }
  });
