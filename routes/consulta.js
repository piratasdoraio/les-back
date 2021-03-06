var express = require('express')
const db = require('../modules/db')
var router = express.Router()

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.post('/', async (req, res) => {
    // #swagger.tags = ['consulta']
    // #swagger.description = 'Endpoint para cadastrar uma consulta.'


    let consulta = await db.consultas.create({
        data: {
            pacientes: { connect: { id: req.body.pacienteId } },
            data: req.body.data,
            checkin: false,
            status: "Marcado"
        }
    })

    console.log("criado consulta")

    res.json({ "message": "cadastrado com sucesso" })
})

router.get('/:id', async (req, res) => {
    // #swagger.tags = ['comsulta']
    let id = parseInt(req.params.id)
    let consultas = await db.consultas.findMany({

        where: {
            paciente: id,
        },
        orderBy: {
            id: 'desc',
        }

    })

    res.json({ "consultas": consultas })
})

router.get('/:id/exames', async (req, res) => {
    // #swagger.tags = ['consulta']
    let exames = await db.exames.findMany({
        where: {
            consulta: parseInt(req.params.id)
        },
        orderBy: {
            id: 'desc'
        }
    })

    res.json({ exames: exames })

})

module.exports = router