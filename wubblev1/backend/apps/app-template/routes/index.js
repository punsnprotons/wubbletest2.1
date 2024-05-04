"use strict";

const router = require("express").Router();

// const websocket = require('@es-labs/node/services/websocket') // .open(null, null) // or set to null
// websocket.setOnClientMessage = async (data, , isBinary ws, _wss) => { }
// websocket.setOnClientCLose =  (ws) => { }

// export your routes here - make sure no clashes
module.exports = (app) => {
  app.use(
    `/api/${APP_NAME}`,
    router.use("/", require("./base")), // http://127.0.0.1:3000/api/app-template/
    router.use("/auth", require("./authRouter")),
    router.use("/customer", require("./customerRouter")),
    router.use("/rytr", require("./rytrRouter")),
    router.use("/replicate", require("./replicateRouter")),
    router.use("/profile", require("./profileRouter")),
    router.use("/contact", require("./contactRouter"))
  );
};
