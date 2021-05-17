const express = require('express')
const cors = require('cors')
const app = express()

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

var paciente = require('./routes/paciente')
var consulta = require('./routes/consulta')
var medico = require('./routes/medico')
var exame = require('./routes/exame')
var laudo = require('./routes/laudo')
var funcionario = require('./routes/funcionario')
var admin = require('./routes/admin')
var sistema = require('./routes/sistema')

const db = require('./modules/db')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.get('/', async (req, res) => {
    res.json({"message": "Em desenvolvimento"})
})

app.use('/paciente', paciente)
app.use('/consulta', consulta)
app.use('/medico', medico)
app.use('/exame', exame)
app.use('/laudo', laudo)
app.use('/funcionario', funcionario)
app.use('/admin', admin)
app.use('/sistema', sistema)

app.listen(3030)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

console.log("rodando aq")