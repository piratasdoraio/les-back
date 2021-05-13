var express = require('express')
const db = require('../modules/db')
var router = express.Router()

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.post('/', async (req, res) => {
    data = req.body

    await db.consultas.create({data: {
        pacientes: {connect: {id: data.pacienteid}},
        data: data.data,
        checkin: false,
        status: "Marcado"
    }})

    console.log("criado consulta")

    res.json({ "message": "Em desenvolvimento" })
})

router.get('/:id', (req, res) => {
    res.json({ "message": "Em desenvolvimento" })
})

router.get('/:id/exames', (req, res) => {
    res.json({ "message": "Em desenvolvimento" })
})

module.exports = router