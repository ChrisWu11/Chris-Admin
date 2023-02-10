const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const tokenRouter = require('./app/api/token')
const contentRouter = require('./app/api/content')
const userRouter = require('./app/api/users')
const Auth = require('./middlewares/auth')
const { secretKey } = require('./config/config')
const { generateToken } = require('./core/util')
const jwt = require('jsonwebtoken')
require('./utils/db')

const app = new Koa()

app.use(async (ctx, next) => {  
  if(ctx.url.includes('token')){
    // console.log('url',ctx.url);
    await next();
  }else{
    // console.log(ctx.request.header)
    const token = ctx.request.header.authorization.split(' ')[1];
    const isValid = jwt.verify(token, secretKey);
    console.log('isValid',isValid)
    if(isValid){
      const newToken = generateToken(isValid.uid,
        isValid.scope,
        isValid.role)
      console.log(newToken)
      ctx.set('Authorization',`Bearer ${newToken}`)
      await next();
    }else{
      ctx.status = 401;
      ctx.body = '登录已失效';
    }
  }
})

app.use(bodyParser())
app.use(tokenRouter.routes())
app.use(userRouter.routes())
app.use(contentRouter.routes())

app.listen(6000,()=>{
  console.log('6000端口服务器已启动')
})