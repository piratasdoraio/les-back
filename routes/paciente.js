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

// router.use(verifyJWT)

var axios = require('axios').default

router.post('/', async (req, res) => {
    let paciente = await db.pacientes.create({
        data: {
            email: req.body.email,
            senha: req.body.senha,
            nome: req.body.nome,
            telefone: req.body.telefone,
            cpf: req.body.cpf,
            enderecos: {
                create: {
                    cep: req.body.endereco.cep,
                    complemento: req.body.endereco.complemento,
                    numero: req.body.endereco.numero,
                }
            },
            nascimento: new Date(req.body.nascimento)
        }
    })
    axios.post("https://piratasdoraio.com/pdr-med/mailer/index.php", {
        "token": "les-pdr-senha-yey",
        "de": "PDR MED",
        "email": paciente.email,
        "assunto": "Conta criada",
        "mensagem": "Sua conta foi criada"
    })
    res.json({ "message": `Paciente ${paciente.nome} criado com o id ${paciente.id}` })
})

router.post('/login', async (req, res) => {
    let paciente = await db.pacientes.findFirst({
        where: {
            email: {
                equals: req.body.email
            },
            senha: {
                equals: req.body.senha
            }
        }
    })

    if (!paciente) return res.json({ "code": 3, "message": "Erro no login: Credenciais invalidas" })


    const token = jwt.sign({ "code": 1, "tipo": "paciente", "id": paciente.id }, "TODO super secreta senha TODO", {
        // expiresIn: 300 // expires in 5min
    });

    // console.log(paciente)
    res.json({
        "code": 1,
        "tipo": "paciente",
        "nome": paciente.nome,
        "id": paciente.id,
        "token": token
    })
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