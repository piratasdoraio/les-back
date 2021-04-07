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
router.post('/', async(req, res) => {
    data = req.body
    tipo = data.tipo

    let senha = require("crypto")
        .createHash("sha256")
        .update(data.senha)
        .digest("hex");

    let medico;

    if (tipo == "residente") {
        medico = await db.medicos.create({
            data: {
                tipo: tipo,
                email: data.email,
                senha: senha,
                nome: data.nome,
                cpf: data.cpf,
                telefone: data.telefone,
                enderecos: {
                    create: {
                        cep: data.endereco.cep,
                        complemento: data.endereco.complemento,
                        numero: data.endereco.numero,
                    }
                },
                residenciainicio: data.residenciainicio,
                residenciafim: data.residenciafim,
            }

        })
    } else if (tipo == "professor") {
        medico = await db.medicos.create({
            data: {
                tipo: tipo,
                email: data.email,
                senha: senha,
                nome: data.nome,
                cpf: data.cpf,
                crm: data.crm,
                titulacao: data.titulacao,
                telefone: data.telefone,
                enderecos: {
                    create: {
                        cep: data.endereco.cep,
                        complemento: data.endereco.complemento,
                        numero: data.endereco.numero,
                    }
                },
            }
        })
    } else {
        // Medico medico
        medico = await db.medicos.create({
            data: {
                tipo: tipo,
                email: data.email,
                senha: senha,
                nome: data.nome,
                cpf: data.cpf,
                telefone: data.telefone,
                crm: data.crm,
                enderecos: {
                    create: {
                        cep: data.endereco.cep,
                        complemento: data.endereco.complemento,
                        numero: data.endereco.numero,
                    }
                },
            }
        })
    }

    res.json({ "message": `Medico ${medico.nome} criado com o id ${medico.id}` })
})

router.post('/login', async(req, res) => {
    let data = req.body
    let senha = require("crypto")
        .createHash("sha256")
        .update(data.senha)
        .digest("hex");
    let medico = await db.medicos.findFirst({
        where: {
            email: {
                equals: data.email
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
    res.json({ "message": "Em desenvolvimento" })
})

router.patch('/disponivel/:id', (req, res) => {
    res.json({ "message": "Em desenvolvimento" })
})

module.exports = router