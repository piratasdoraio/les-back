const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'

// const endpointsFiles = [
//     './routes/paciente',
//     './routes/consulta',
//     './routes/medico',
//     './routes/exame',
//     './routes/laudo',
//     './routes/funcionario',
//     './routes/admin',
//     './routes/sistema',
// ]

const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles)