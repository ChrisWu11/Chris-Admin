const Router = require('@koa/router')
// const users = require('../../data/users')
const { generateToken } = require('../../core/util')
const Auth = require('../../middlewares/auth')
const { roles,users } = require ('../../data/roles')
const { signup,findUser,savaRoles,findRole,getUser } = require ('../../models/users')

const tokenRouter = new Router({
  prefix: '/token'
})

// 检测用户名、密码，返回 token 接口
tokenRouter.post('/', async ctx => {
  // console.log(ctx.request);
  const { username, password } = ctx.request.body;
  let user = await findUser(username)
  if (!user) {
    ctx.body = {
      errCode: 10001,
      msg: '用户名或密码不正确',
    }
    return
  }

  const token = generateToken(user.id, Auth.USER,user.role)
  user.token = `Bearer ${token}`

  ctx.body = {
    user,token:`Bearer ${token}`
  }
})

// 检测 token 的有效性
tokenRouter.post('/verify', async ctx => {
  // console.log(ctx.request.header.authorization);
  const token = ctx.request.header.authorization.split(' ')[1];
  const isValid = Auth.verifyToken(token);
  ctx.body = {
    isValid
  }
})

tokenRouter.post('/roles', async ctx => {
  const { role } = ctx.request.body;
  Auth.role = role;
  // console.log('role',role);
  let data = await findRole(role);
  // console.log('data',data)
  obj = data[role]
  // console.log('obj',obj)

  ctx.body = {
    data: JSON.parse(obj),
  }
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

function verifyUsernamePassword(username, password) {
  const index = users.findIndex(user => {
    return user.username === username && user.password == password
  })

  const user = users[index]

  if (!user) {
    return
  }

  // user.token = token;

  return user
}

module.exports = tokenRouter