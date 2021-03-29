const express = require('express')
const app = express()

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

console.log("rodando aq")