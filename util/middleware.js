const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')
const { Session, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  let token
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
    try {
      req.decodedToken = jwt.verify(token, SECRET)
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  const session = await Session.findOne({
    where: { token },
    include: { model: User, attributes: ['id', 'disabled'] }
  })

  if (!session || session.user.disabled) {
    return res.status(401).json({ error: 'session invalid' })
  }

  next()
}

module.exports = { tokenExtractor }