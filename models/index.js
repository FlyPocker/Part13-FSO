const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readings_list')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings', foreignKey: 'userId' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users', foreignKey: 'blogId' })
User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog, User, ReadingList, Session
}
