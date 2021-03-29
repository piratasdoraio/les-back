var express = require('express')
const db = require('../modules/db')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var router = express.Router()

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.post('/', async (req, res) => {
    let paciente = await prisma.pacientes.create({
        data: {
            email: req.body.email,
            senha: req.body.senha,
            nome: req.body.nome,
            telefone: req.body.telefone,
            cpf: req.body.cpf,
            enderecos: {
                create: {
                    cep: req.body.endereco.cep,
                    complemento : req.body.endereco.complemento,
                    numero: req.body.endereco.numero,
                }
            },
            nascimento: new Date(req.body.nascimento)
        }
    })
    res.json({ "message": `Paciente ${paciente.nome} criado com o id ${paciente.id}` })
})

router.post('/login', (req, res) => {
    res.json({ "message": "Em desenvolvimento" })
})

router.get('/:id', (req, res) => {
    res.json({ "message": "Em desenvolvimento" })
})

router.patch('/:id', (req, res) => {
    res.json({ "message": "Em desenvolvimento" })
})

router.get('/:id/consultas', (req, res) => {
    res.json({ "message": "Em desenvolvimento" })
})

module.exports = router