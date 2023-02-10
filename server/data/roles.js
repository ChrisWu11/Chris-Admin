// 用户信息
const users = [
  {
    id: 1,
    username: 'student',
    password: '123456',
    photo: 'https://img0.baidu.com/it/u=310302116,81759093&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    role: 'student',
    rights: []
  },
  {
    id: 2,
    username: 'admin',
    password: '123456',
    photo: 'https://img2.baidu.com/it/u=4122911328,3682795568&fm=253&fmt=auto&app=138&f=JPEG',
    role: 'admin',
    rights: []
  }
]

// 权限信息 将权限信息从用户信息中抽离出来 不同身份对应不同的路由信息
// 这样方便了后期的维护 否则以后每加一个页面就需要在每个用户信息中做更改 十分的不方便 如果用户多了更是增添了不必要的麻烦
// 将用户直接分为不同身份 然后对不同身份做处理 这样比较合理
const roles = {
  student: [
    {
      id: 1,
      authName: '基本页面',
      icon: 'el-icon-connection',
      children: [
        {
          id: 11,
          authName: '表格页面',
          icon: 'el-icon-s-grid',
          path: 'table',
          rights: ['view']
        },
        {
          id: 12,
          authName: '素材页面',
          icon: 'el-icon-s-marketing',
          path: 'image',
          rights: ['view']
        }
      ]
    }
  ],
  admin: [
    {
      id: 1,
      authName: '基本页面',
      icon: 'el-icon-connection',
      children: [
        {
          id: 11,
          authName: '表格页面',
          icon: 'el-icon-s-grid',
          path: 'table',
          rights: ['view', 'edit', 'add', 'delete']
        },
        {
          id: 12,
          authName: '素材页面',
          icon: 'el-icon-s-marketing',
          path: 'image',
          rights: ['view', 'edit', 'add', 'delete']
        }
      ]
    },
    {
      id: 2,
      authName: '用户权限',
      icon: 'el-icon-set-up',
      children: [
        {
          id: 21,
          authName: '权限页面',
          icon: 'el-icon-s-custom',
          path: 'users',
          rights: ['view', 'edit', 'add', 'delete']
        }
      ]
    }
  ]
}

// 表格信息
const tables = [{
  date: '2016-05-02',
  name: '王翼',
  address: '东十四267一号床'
}, {
  date: '2016-05-04',
  name: '吴康',
  address: '东十四267二号床'
}, {
  date: '2016-05-01',
  name: '谢玉奇',
  address: '东十四267三号床'
}, {
  date: '2016-05-03',
  name: '叶祥清',
  address: '东十四267四号床'
}]

module.exports = {users,roles,tables}