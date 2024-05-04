'use strict'
const express = require('express')
const StoreKnex = require('../services').get('knex1')
const { getReadURL } = require('../services/aliyunOSS')

module.exports = express.Router()
  .get('/', async (req, res) => res.send('app-template/ OK'))
  .get('/healthcheck', (req, res) => res.send('app-template/healthcheck OK'))
  .get('/session', async (req, res) => {
    try {
      const { sessionId } = req.query
      let session = await StoreKnex.knex('user').where('sessionId', sessionId).first()

      return res.json(session)
    } catch (e) {
      return res.status(500).json({ message: e.toString() })
    }
  })

  .post('/getOssUrl', async (req, res) => {
    const { ossFileName } = req.body
    
    try {
      // TBD read - local file
      let url = '';
      const hostname = req.headers.host;
      url = `${hostname}/uploads/genre/${ossFileName}`;

      if (global.CONFIG.OSS_BUCKET.includes('wubble-fs-master')) {
        url = `https://${url}`
      } else {
        url = `http://${url}`
      }

      return res.json({ url })
    } catch (e) {
      console.log('error:', e)
      return res.status(500).json({ message: e.toString() })
    }
  })