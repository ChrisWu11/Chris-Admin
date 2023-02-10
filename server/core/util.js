const jwt = require('jsonwebtoken')
const { secretKey, expiresIn } = require('../config/config')

function generateToken(uid, scope,role) {
  const token = jwt.sign(
    {
      uid,
      scope,
      role
    },
    secretKey,
    {
      expiresIn
    }
  )

  return token
}

module.exports = {
  generateToken
}