const router = require('express').Router()
const { ReadingList, Blog, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res, next) => {
  try {
    const { blogId, userId } = req.body

    const blog = await Blog.findByPk(blogId)
    const user = await User.findByPk(userId)

    if (!blog || !user) {
      return res.status(400).json({ error: 'Invalid blogId or userId' })
    }

    const readingListEntry = await ReadingList.create({ blogId, userId })
    res.status(201).json(readingListEntry)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const readingListItem = await ReadingList.findByPk(req.params.id)

    if (!readingListItem) {
      return res.status(404).json({ error: 'Reading list item not found' })
    }
    if (readingListItem.userId !== req.decodedToken.id) {
      return res.status(403).json({ error: 'Unauthorized to modify this reading list' })
    }

    readingListItem.read = req.body.read
    await readingListItem.save()

    res.json(readingListItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router