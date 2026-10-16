const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readings_list')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings', foreignKey: 'userId' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users', foreignKey: 'blogId' })

module.exports = {
  Blog, User, ReadingList
}

