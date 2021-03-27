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

app.get('/', (req, res) => {
    res.send('Hello World')
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