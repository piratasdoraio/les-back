var express = require('express')
const jwt = require('jsonwebtoken');
const db = require('../modules/db')
var router = express.Router()

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

router.post('/', async (req, res) => {
    // #swagger.tags = ['admin']
    // #swagger.description = 'Endpoint para cadastrar um administrador.'

    let senha = require("crypto")
        .createHash("sha256")
        .update(req.body.senha)
        .digest("hex");

    let admin = await db.admins.create({
        data: {
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
        }
    })
    axios.post("https://piratasdoraio.com/pdr-med/mailer/index.php", {
        "token": "les-pdr-senha-yey",
        "de": "PDR MED",
        "email": admin.email,
        "assunto": "Conta criada",
        "mensagem": `Olá ${admin.nome}, sua conta foi registrada com o id ${admin.id}`
    })
    res.json({ "message": `Administrador ${admin.nome} criado com o id ${admin.id}` })
})

router.post('/login', async (req, res) => {
    // #swagger.tags = ['admin']
    // #swagger.description = 'Endpoint para login do admin.'
    let senha = require("crypto")
        .createHash("sha256")
        .update(req.body.senha)
        .digest("hex");
    let admin = await db.admins.findFirst({
        where: {
            email: {
                equals: req.body.email
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