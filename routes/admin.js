var express = require('express')
const jwt = require('jsonwebtoken');
const db = require('../modules/db')
var router = express.Router()

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.post('/', async (req, res) => {
    res.json({ "message": "Em desenvolvimento" })
})

router.post('/login', async (req, res) => {
    let data = req.body
    let senha = require("crypto")
        .createHash("sha256")
        .update(data.senha)
        .digest("hex");
    let admin = await db.admins.findFirst({
        where: {
            email: {
                equals: data.email
            },
            senha: {
                equals: senha
            }
        }
    })

    if (!admin) return res.json({ "code": 3, "message": "Erro no login: Credenciais invalidas" })


    const token = jwt.sign({
            "code": 1,
            "id": admin.id
        },
        "TODO super secreta senha TODO", {
            // expiresIn: 300 // expires in 5min
        });

    res.json({
        "code": 1,
        "nome": admin.nome,
        "id": admin.id,
        "token": token
    })
})

module.exports = router