'use strict'
const StoreKnex = require('../apps/app-template/services').get('knex1')

const authIsAdmin = async (req, res, next) => {
  try {
    let user = await StoreKnex.knex('administrator').where('userId', req.decoded.id).first()
    if (user) {
      return next()
    }
    else {
      return res.status(401).json({ error: 'Not Allowed' })
    }
  }catch(e) {
    return res.status(500).json({ error: e.toString() })
  }
}

module.exports = {
  authIsAdmin
}
