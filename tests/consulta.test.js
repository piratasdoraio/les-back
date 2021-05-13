const consulta = require('../routes/consulta')
const { mockRequest, mockResponse } = require('../util/interceptor')
// const { PrismaClient }  = require('@prisma/client')

describe('teste de consulta.js', () => {
    //cadastro de consulta
    test('should 200 and return correct value', async () => {
        let req = mockRequest();
        req.params.id = 1;
        const res = mockResponse();

        await consulta.consulta(req, res);

        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send.mock.calls.length).toBe(1);
        expect(res.send).toHaveBeenCalledWith('IM A consulta CONTROLLER');
    })

    test('should 404 and return correct value', async () => {
        let req = mockRequest();
        req.params.id = null;
        const res = mockResponse();

        await consulta.consulta(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    })

})