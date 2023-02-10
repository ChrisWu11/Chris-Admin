const Router = require('@koa/router')
const Auth = require('../../middlewares/auth')
const { tables } = require ('../../data/roles')

const contentRouter = new Router({
  // 设置路由前缀 /content
  prefix: '/content'
})



// 获取文章内容接口
contentRouter.get('/', async ctx => {
  ctx.body = tables
})

// 新增文章内容接口
contentRouter.post('/', new Auth(3,'student').middleware, async ctx => {
  ctx.body = '新增文章内容成功'
})

contentRouter.delete('/',new Auth(1,Auth.role).middleware, async ctx => {
  ctx.body = '删除成功'
})

module.exports = contentRouter