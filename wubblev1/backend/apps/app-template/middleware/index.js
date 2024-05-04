const StoreKnex = require('../services').get('knex1')
const { jwt, getSecret } = require('@es-labs/node/auth')
const { JWT_ALG } = global.CONFIG

const authUser = async (req, res, next) => {
  try {
    let tmp = req.header('authorization')
    if(!tmp) {
      return res.status(500).json({ error: 'Token error' })
    }
    token = tmp.split(' ')[1]
    let session = await StoreKnex.knex('session').where('token', token).first()
    if (session?.userId) {
      let user = await StoreKnex.knex('user').where('id', session.userId).first()
      let rv0 = await StoreKnex.knex('customer').where('userId', session.userId).first()
      let rv1 = await StoreKnex.knex('administrator').where('userId', session.userId).first()
      if(rv0) {
        req.role = rv0?.customFieldsRole
      }
      if(rv1) {
        req.role = 'admin'
      }
      req.decoded = {userId: user.id, email: user.identifier}
      return next()
    }
    else {
      return res.status(401).json({ error: 'Not Allowed' })
    }
  }catch(e) {
    console.log("error - authUser")
    return res.status(500).json({ error: `authUser: ${e.toString()}` })
  }
}

const authIsAdmin = async (req, res, next) => {
  try {
    let user = await StoreKnex.knex('administrator').where('userId', req.decoded.userId).first()
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

const authLoggedIn = async (req, res, next) => {
  try {
    const { funeralId } = req.query
    let tmp = req.header('authorization')
    let token = null
    let isRFM = false
    let isloggedIn = false
    let user = {
      id:null,
      email: null
    }
    if(tmp) {
      isloggedIn = true
      //access_token = tmp.split(' ')[1]
      token = tmp.split(' ')[1]
    }
    if (token) {
      let session = await StoreKnex.knex('session').where('token', token).first()
      if(session.userId) {
        user = await StoreKnex.knex('user').where('id', session.userId).first()
        let rfm = await StoreKnex.knex('tlc_rfm').where({'email': user.identifier, 'funeralId': funeralId}).first()
        if(rfm) {
          isRFM = true
        }
      }else {
        //anonymousSession
      }  
      
    }
    
    req.decoded = {
      id: user.id,
      email: user.identifier,
      isloggedIn: isloggedIn,
      isRFM: isRFM
    }

    return next()
  }catch(e) {
    return res.status(500).json({ error: e.toString() })
  }
  
  
}

module.exports = {
  authUser,
  authIsAdmin,
  authLoggedIn
}