var mongoose = require('mongoose');
// var db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))

let routerMap = {
  'userManger': {
    id: 1,
    authName: '权限管理',
    icon: 'el-icon-connection',
    children: [
      {
        id: 11,
        authName: '用户页面',
        icon: 'el-icon-s-grid',
        path: 'table',
        rights: []
      },
      {
        id: 12,
        authName: '素材页面',
        icon: 'el-icon-s-marketing',
        path: 'image',
        rights: []
      }
    ]
  },
  'test': {
    id: 2,
    authName: '测试菜单',
    icon: 'el-icon-set-up',
    children: [
      {
        id: 21,
        authName: '测试页面',
        icon: 'el-icon-s-custom',
        path: 'users',
        rights: []
      }
    ]
  }
}




// 构建users的model
var usersSchema = mongoose.Schema({
    username: String,
    password: String,
    photo: String,
    role: String,
    rights: Array
})

var Users = mongoose.model('users', usersSchema);

// 构建roles的model
var rolesSchema = mongoose.Schema({
  admin : Array,
  student : Array
})

var Roles = mongoose.model('roles', rolesSchema);

const savaRoles = (role) => {
  console.log('role',role)
  const roles = new Roles({
    student:role,
    admin: [1,2,3]
  })
  return roles.save()
}

const findRole = (ro) => {
  return Roles.findOne({role : ro})
}

const getUser = () => {
  return Users.find();
}

const findUser = (username) => {
  return Users.findOne({username})
}

const signup = (form) => {
  let {username,password,type,type2,role} = form;
  let rights = [];
  type.forEach(item => {
    let route = JSON.parse(JSON.stringify(routerMap[item]));
    let children = route.children.map(item=>{
      item.rights = type2;
      return item;
    })
    route.children = children;
    rights.push(route);
  })
  const users = new Users({
      username,
      password,
      photo:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14147005305%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671107701&t=d3f5171a3a670735f38c8ebfac0306d2',
      role,
      rights
  })
  return users.save()
}

const findList = () => {
  return Users.find().sort({_id: -1})
}

const remove = username => {
  return Users.deleteOne({username})
}

const update = (form)=>{
  let {username,type,type2} = form;
  let rights = [];
  type.forEach(item => {
    let route = JSON.parse(JSON.stringify(routerMap[item]));
    let children = route.children.map(item=>{
      item.rights = type2;
      return item;
    })
    route.children = children;
    rights.push(route);
  })
  return Users.update({username}, {rights: rights},{upsert:false},function (err, raw) {
    if (err) console.log(err);
    console.log('The raw response from Mongo was ', raw);
  })
}

exports.signup = signup
exports.findUser = findUser
exports.findList = findList
exports.remove = remove
exports.savaRoles = savaRoles
exports.findRole = findRole
exports.getUser = getUser
exports.update = update