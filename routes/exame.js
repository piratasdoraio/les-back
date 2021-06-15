var express = require('express')
const db = require('../modules/db')
var router = express.Router()

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
router.get('/:id', async(req, res)=>{
    let id = parseInt(req.params.id)
    let exame = await db.exames.findMany({
        where: {
            consulta: id,
        },
        orderBy: {
            id: 'desc',
        }    
    }) 
    
    res.json({ exame: exame})
})
router.post('/', async (req, res) => {
    // #swagger.tags = ['exame']
    let exame = await db.exames.create({data: {
        consultas: {connect: {id: req.body.consulta}},
        data: req.body.data,
        tipo: req.body.tipo,
        status: "Marcado"
    }})

    res.json({exame: exame})
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