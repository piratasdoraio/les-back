var express = require('express')
var router = express.Router()

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.post('/', (req, res) => {
    res.json({ "message": "Em desenvolvimento" })
})

router.get('/:id', (req, res) => {
    res.json({ "message": "Em desenvolvimento" })
})

router.get('/:id/exames', (req, res) => {
    res.json({ "message": "Em desenvolvimento" })
})

module.exports = router