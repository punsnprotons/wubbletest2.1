'use strict'
// SERVICES
const services = {
  knex1: null,
  knex2: null,
  mongo1: null,
  keyv: null,
  //NOSONAR redis: null,
  //NOSONAR hazelcast: null
}

const StoreKnex = require('@es-labs/node/services/db/knex') 
const StoreKeyV = require('@es-labs/node/services/db/keyv')
const {setupStorage} = require('./aliyunOSS') 
const websocket = require('@es-labs/node/services/websocket')
const {setupSendGrid} = require('@es-labs/node/comms/email')

const auth = require('@es-labs/node/auth')

const start = async (server=null) => {
  services.keyv = new StoreKeyV()
  services.keyv.open()
  services.knex1 = new StoreKnex()
  services.knex1.open()
  setupStorage()
  setupSendGrid()
  websocket.open(server, null) // or set to null
  console.log('services - start - end')
  auth.setupAuth(services.keyv.get(), services.knex1.get()) // setup authorization
}

const stop = async () => {
  console.log('services - stop - begin')
  websocket.close() // websockets
  await services.knex1.close()
  await services.knex2.close()
  await services.keyv.close()
  console.log('services - stop - end')
}

module.exports = {
  start,
  stop,
  get: (service) => services[service]
}