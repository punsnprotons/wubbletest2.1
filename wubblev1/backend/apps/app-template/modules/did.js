const axios = require("axios").default;
const { DID_APIKEY, DID_AVATAR_SOURCE } = global.CONFIG;

const instance = axios.create({
  baseURL: "https://api.d-id.com",
  headers: {
    Authorization: "Basic " + DID_APIKEY,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const connectStream = async () => {
  try {
    const { data } = await instance.post("/talks/streams", {
      source_url: DID_AVATAR_SOURCE,
    });
    return data;
  } catch (error) {
    console.log("Error on connectStream", error.response.data);
    throw new Error(error.response.data.description);
  }
};

const startStream = async (streamId, sessionClientAnswer, sessionId) => {
  try {
    //console.log("sessionClientAnswer", sessionClientAnswer)
    console.log('sessionId', sessionId),
    console.log('streamId', streamId)
    const body = {
      answer: sessionClientAnswer,
      session_id: sessionId,
    };
    const { data } = await instance.post('/talks/streams/' + streamId + '/sdp', body);
    //console.log("startStream rv", data)
    return data;
  } catch (error) {
    console.log("Error on startStream", error.response.data);
    //throw new Error(error.toString());
  }
};

const sendStreamContent = async (inputText, streamId, sessionId, language) => {
  try {
    const body = {
      script: {
        type: "text",
        input: inputText + '<break time="1000ms"/>',
        ssml: true,
        provider: language === 'English' ? { type: "microsoft", voice_id: "en-SG-LunaNeural" } : { type: "microsoft", voice_id: "zh-CN-XiaoxiaoNeural" }
      },
      driver_url: "bank://lively/",
      config: {
        stitch: true,
        auto_match: true,
        fluent: true
      },
      session_id: sessionId,
    };
    const { data } = await instance.post(`/talks/streams/${streamId}`, body);
    return data;
  } catch (error) {
    console.log("Error on sendStreamContent", error.response.data);
    return {
      status: error.response.data.kind,
      description: error.response.data.description,
    }
    //throw new Error(error.toString());
  }
};

const onIceCandidate = async (
  streamId,
  candidate,
  sdpMid,
  sdpMLineIndex,
  sessionId
) => {
  try {
    const res = await instance.post(`/talks/streams/${streamId}/ice`, {
      candidate,
      sdpMid,
      sdpMLineIndex,
      session_id: sessionId,
    });
  } catch (error) {
    console.log("Error on onIceCandidate", error.response.data);
    //throw new Error(error.toString());
  }
};

module.exports = {
  connectStream,
  startStream,
  sendStreamContent,
  onIceCandidate,
}
