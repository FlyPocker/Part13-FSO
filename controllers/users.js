const router = require('express').Router()
const { User, Blog } = require('../models')


router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
        model: Blog,
        attributes: { exclude: ['userId'] }
        }
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { read } = req.query
    const where = {}

    if (read !== undefined) {
      where.read = read === 'true'
    }

    const user = await User.findByPk(req.params.id, {
      include: {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        through: {
          attributes: ['read', 'id'],
          where
        }
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    const userJson = user.toJSON()
    userJson.readings = userJson.readings.map(reading => {
      return {
        ...reading,
        readingList: {
          read: reading.reading_list.read,
          id: reading.reading_list.id
        },
        reading_list: undefined
      }
    })
    res.json(userJson)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, res) => {
    const user = await User.findOne({ where: { username: req.params.username } })
    if (user) {
        await user.update(req.body)
        res.json(user)
    } else {
        res.status(404).end()
    }
})

module.exports = router