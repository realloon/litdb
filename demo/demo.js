import Litdb from '../litdb'

// 初始化数据库
const db = new Litdb()

// 使用实例
const users = db.collection('users')

// console.log(users.filter({ name: '李真' }))

// users.add({ name: '李真', age: 21 })
// users.add({ name: '李思琪', age: 21 })

// console.log(users.delete({ age: 21 }))

// console.log(users.update({ name: '李真' }, { sex: 'male' }))

// console.log(users.clear())
