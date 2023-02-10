const jwt = require('jsonwebtoken')
// const basicAuth = require('basic-auth')
const { secretKey } = require('../config/config')

class Auth {
  constructor(level,role) {
    Auth.USER = 2
    Auth.ADMIN = 8
    this.level = level
    this.role = role
  }

  get middleware() {
    return async (ctx, next) => {
      // console.log('ctx.request',ctx.request)
      // const token = basicAuth(ctx.request)

      const token = ctx.request.header.authorization.split(' ')[1];
      console.log('Auth.role',Auth.role)

      let result = jwt.verify(token, secretKey)
      console.log(result)

      if (result.scope < this.level) {
        ctx.body = {
          errCode: 1005,
          msg: '权限不足',
        }
        return
      }

      if (Auth.role === 'student') {
        ctx.body = {
          errCode: 1005,
          msg: '权限不足',
        }
        return
      }
      await next()
    }
  }

  static verifyToken(token) {
    try {  
      let result = jwt.verify(token, secretKey);
      return result;
    } catch(e) {
      return false
    }
  }
}

module.exports = Auth