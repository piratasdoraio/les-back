var express = require('express')
const db = require('../modules/db')
var router = express.Router()

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.post('/', (req, res) => {
    // #swagger.tags = ['exame']
    res.json({ "message": "Em desenvolvimento" })
})

router.post('/:id', (req, res) => {
    // #swagger.tags = ['exame']
    res.json({ "message": "Em desenvolvimento" })
})

router.post('/:id/realizar', (req, res) => {
    // #swagger.tags = ['exame']
    res.json({ "message": "Em desenvolvimento" })
})

router.patch('/:id/validar', (req, res) => {
    // #swagger.tags = ['exame']
    res.json({ "message": "Em desenvolvimento" })
})

module.exports = router