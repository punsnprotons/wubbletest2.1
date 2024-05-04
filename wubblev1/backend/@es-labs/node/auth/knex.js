'use strict'

let knex
let JWT_REFRESH_STORE_NAME
let AUTH_USER_STORE_NAME

exports.setTokenService = (service) => knex = service
exports.setUserService = (service) => knex = service
exports.setRefreshTokenStoreName = (name) => JWT_REFRESH_STORE_NAME = name
exports.setAuthUserStoreName = (name) => AUTH_USER_STORE_NAME = name

// id field must be unique, upsert for PostgreSQL, MySQL, and SQLite only
exports.setRefreshToken = async (id, refresh_token) => knex(JWT_REFRESH_STORE_NAME).insert({ id, refresh_token }).onConflict('id').merge()
exports.getRefreshToken = async (id) => (await knex(JWT_REFRESH_STORE_NAME).where({ id: id }).first()).refresh_token
exports.revokeRefreshToken = async (id) => knex(JWT_REFRESH_STORE_NAME).where({ id: id }).delete()
exports.updateUser = async (where, payload) => knex(AUTH_USER_STORE_NAME).where(where).first().update(payload)

//Changed for <Project Totoz> usecase
exports.findUser = async (where) => {
  try {
    return knex
      .select('authentication_method.identifier as identifier', 'authentication_method.passwordHash as passwordHash', 'user.id as userId')
      .from(AUTH_USER_STORE_NAME)
      .join('authentication_method', 'user.id', 'authentication_method.userId')
      .where(where)
      .whereNull('user.deletedAt')
      .first()
  } catch (e) {
    console.log(e.toString())
  }
}

exports.find2FA = async (where) => {
  try {
    return knex('two_factors').where(where).first()
  } catch (e) {
    console.log(e.toString())
  }
}

exports.getUserData = async (identifier) => {
  try {
    const getUser = knex
      .select('u.id as userId', 'u.firstName', 'u.lastName', 'u.email', 'u.role', 'u.status', 'u.image')
      .from('user as u')
      .where('u.email', identifier)
      .first()

    return getUser
  } catch (e) {
    console.log(e.toString())
  }
}



