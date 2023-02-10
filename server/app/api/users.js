const Router = require('@koa/router')
// const users = require('../../data/users')
const { generateToken } = require('../../core/util')
const Auth = require('../../middlewares/auth')
const { roles,users } = require ('../../data/roles')
const { signup,findUser,savaRoles,findRole,getUser,update,remove } = require ('../../models/users')

const tokenRouter = new Router({
  prefix: '/user'
})

tokenRouter.get('/getUsers', async ctx => {
  let user = await getUser()
  ctx.body = {
    user
  }
})

tokenRouter.post('/addUsers', async ctx => {
  const { form } = ctx.request.body;
  // console.log(form)
  let user = await signup(JSON.parse(form))
  ctx.body = {
    user
  }
})

tokenRouter.put('/editUsers', async ctx => {
  const { data } = ctx.request.body;
  // console.log(form)
  let res = await update(data)
  console.log(res)
  ctx.body = {
    res
  }
})

tokenRouter.delete('/deleteUsers', async ctx => {
  const { username } = ctx.request.body;
  // console.log(form)
  let res = await remove(username)
  console.log(username)
  ctx.body = {
    res
  }
})

module.exports = tokenRouter