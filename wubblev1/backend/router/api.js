'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const { spawn } = require('child_process')
const axios = require('axios')
const PdfKit = require('pdfkit')

const ws = require('@es-labs/node/services/websocket')
const agenda = require('@es-labs/node/services/mq/agenda').get() // agenda message queue
const bull = require('@es-labs/node/services/mq/bull').get() // bull message queue
const gcp = require('@es-labs/node/services/gcp')
const { memoryUpload, storageUpload } = require(APP_PATH + '/common/upload')

const { UPLOAD_STATIC, UPLOAD_MEMORY, API_PORT, HTTPS_CERTS } = global.CONFIG

const { authUser, setTokensToHeader } = require('@es-labs/node/auth')

module.exports = express.Router({caseSensitive: true})
  .get('/healthcheck', (req, res) => res.json({ message: 'OK - 12', app: APP_NAME, environment: process.env.NODE_ENV, version: APP_VERSION, port: API_PORT, https: HTTPS_CERTS ? true : false }) ) // health check

  .post('/healthcheck', (req, res) => res.json({ message: 'POST OK' }) ) // POST health check

  .post('/test-post-json', (req, res) => { res.json(req.body) }) // check if send header as application/json but body is text

  .post('/test-cors-post', (req, res) => { res.send('Cors Done') }) // check CORS

  .get('/health-auth', authUser, (req, res) => { res.json({ message: 'OK' }) }) // health check auth
 
  .post('/upload-disk', storageUpload(UPLOAD_STATIC[0]).any(), (req,res) => { // avatar is form input name // single('filedata')
    try {
      // console.log('files', req, req.files)
      // body is string, need to parse if json
      res.json({
        ok: true, // success
        message: 'Uploaded',
        body: req.body
      })
    } catch (e) {
      res.json({ error: e.message })
    }
  })

  .post('/upload-memory', memoryUpload(UPLOAD_MEMORY[0]).single('memory'), (req, res) => {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    res.json({
      fileOriginalName: req.file.originalname,
      body: req.body,
      message: req.file.buffer.toString()
    })
  })

  .get('/download', (req, res, next) => { // serve a file download, you can add authorization here to control downloads
    const { filename } =  req.query
    const fullPath = path.join(UPLOAD_STATIC[0].folder, filename)
    // Stream file
    const file = fs.createReadStream(fullPath)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader([
      'Content-Disposition', `inline; filename="${filename}"`
    ])
    file.pipe(res)
  })

  .get('/download-pdf', (req, res) => {
    const { filename } =  req.query
    const ext = path.extname(filename)
    if (filename && ext === '.pdf') {
      const fullPath = path.join(UPLOAD_STATIC[0].folder, filename)
      const pdfDoc = new PdfKit()
      pdfDoc.pipe(fs.createWriteStream(fullPath)) // save as file
      pdfDoc.pipe(res) // stream to response
      pdfDoc.text('hello world!')
      pdfDoc.end()  
    }
  })

  // test websocket broadcast
  .get('/ws-broadcast', async (req, res) => {
    ws.send("WS Broadcast")
    res.send("ws broadcast")
  })
