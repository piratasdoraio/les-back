var express = require('express')
const db = require('../modules/db')
var router = express.Router()

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

const multer = require('multer');
const upload = multer();

router.post('/', async (req, res) => {
    // #swagger.tags = ['exame']
    let exame = await db.exames.create({data: {
        consultas: {connect: {id: req.body.consulta}},
        data: req.body.data,
        tipo: req.body.tipo,
        status: "Marcado"
    }})

    res.json({ "message": "Exame marcado com o id " + exame.id })
})

router.post('/:id', (req, res) => {
    // #swagger.tags = ['exame']
    res.json({ "message": "Em desenvolvimento" })
})

router.post('/:id/realizar', upload.single("arquivo"), async (req, res) => {
    // #swagger.tags = ['exame']

    console.log(req.body.teste)

    console.log(req.file)

    // return res.json({ "message": "Em desenvolvimento" })

    let exame = await db.exames.update({
        where: { id: parseInt(req.params.id) }, data: {

            arquivos: {

                create: {
                    nome: req.file.originalname,
                    mime: req.file.mimetype,
                    data: req.file.buffer
                }
            }
        }
    })

    // let arquivo = await db.arquivos.create({

    // })

    res.json({ "message": "Exame realizado com o id " + exame.id })
})

router.patch('/:id/validar', (req, res) => {
    // #swagger.tags = ['exame']
    res.json({ "message": "Em desenvolvimento" })
})

module.exports = router