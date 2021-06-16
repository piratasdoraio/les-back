var express = require('express')
const jwt = require('jsonwebtoken');
const db = require('../modules/db')
var router = express.Router()

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })


// Cadastro de Medico
router.post('/', async (req, res) => {
    // #swagger.tags = ['medico']
    // #swagger.description = 'Endpoint para cadastrar um medico.'
    tipo = req.body.tipo

    let senha = require("crypto")
        .createHash("sha256")
        .update(req.body.senha)
        .digest("hex");

    let medico;

    if (tipo == "residente") {
        medico = await db.medicos.create({
            data: {
                tipo: tipo,
                email: req.body.email,
                senha: senha,
                nome: req.body.nome,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                enderecos: {
                    create: {
                        cep: req.body.endereco.cep,
                        complemento: req.body.endereco.complemento,
                        numero: req.body.endereco.numero,
                    }
                },
                residenciainicio: req.body.residenciainicio,
                residenciafim: req.body.residenciafim,
            }

        })
    } else if (tipo == "professor") {
        medico = await db.medicos.create({
            data: {
                tipo: tipo,
                email: req.body.email,
                senha: senha,
                nome: req.body.nome,
                cpf: req.body.cpf,
                crm: req.body.crm,
                titulacao: req.body.titulacao,
                telefone: req.body.telefone,
                nome: req.body.nome,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                enderecos: {
                    create: {
                        cep: req.body.endereco.cep,
                        complemento: req.body.endereco.complemento,
                        numero: req.body.endereco.numero,
                    }
                },
                titulacao: req.body.titulacao,
                crm: req.body.crm,
            }
        })
    } else {
        // Medico medico
        medico = await db.medicos.create({
            data: {
                tipo: tipo,
                email: req.body.email,
                senha: senha,
                nome: req.body.nome,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                crm: req.body.crm,
                nome: req.body.nome,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                enderecos: {
                    create: {
                        cep: req.body.endereco.cep,
                        complemento: req.body.endereco.complemento,
                        numero: req.body.endereco.numero,
                    }
                },
                crm: req.body.crm,
            }
        })
    }

    res.json({ "message": `Medico ${medico.nome} criado com o id ${medico.id}` })
})

router.post('/login', async (req, res) => {
    // #swagger.tags = ['medico']
    // #swagger.description = 'Endpoint para login do medico.'
    let senha = require("crypto")
        .createHash("sha256")
        .update(req.body.senha)
        .digest("hex");
    let medico = await db.medicos.findFirst({
        where: {
            email: {
                equals: req.body.email
            },
            senha: {
                equals: senha
            }
        }
    })

    if (!medico) return res.json({ "code": 3, "message": "Erro no login: Credenciais invalidas" })


    const token = jwt.sign({
        "code": 1,
        "tipo": medico.tipo,
        "id": medico.id
    },
        "TODO super secreta senha TODO", {
        // expiresIn: 300 // expires in 5min
    });

    // console.log(medico)
    res.json({
        "code": 1,
        "tipo": medico.tipo,
        "nome": medico.nome,
        "id": medico.id,
        "token": token
    })
})

router.get('/disponivel', (req, res) => {
    // #swagger.tags = ['medico']
    res.json({ "message": "Em desenvolvimento" })
})

router.patch('/disponivel/:id', (req, res) => {
    // #swagger.tags = ['medico']
    res.json({ "message": "Em desenvolvimento" })
})

module.exports = router