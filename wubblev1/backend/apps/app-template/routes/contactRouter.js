"use strict";
const express = require("express");
const StoreKnex = require("../services").get("knex1");
const { sendEmail } = require("../modules/email");

module.exports = express.Router()
    .post('/send-email', async (req, res) => {
        try {
            const { sender, senderName, message } = req.body
            const recipient = "hello@wubble.ai"

            // send email
            await sendEmail(sender, recipient, message)

            return res.json({
                message: "Successfully sent an email."
            })
        } catch (e) {
            console.log('error:', e)
            return res.status(500).json({ message: e.toString() });
        }
    })