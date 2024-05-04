'use strict'
const express = require('express')
const StoreKnex = require('../services').get('knex1')

module.exports = express.Router()
    .get('/list', async (req, res) => {
        try {
            const getCustomer = await StoreKnex.knex('customer')
                .whereNull('deletedAt')

            return res.json(getCustomer)
        } catch (e) {
            return res.status(500).json({ message: e.toString() })
        }
    })