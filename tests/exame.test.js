const exame = require('../routes/exame')
const { mockRequest, mockResponse } = require('../util/interceptor')
// const { PrismaClient }  = require('@prisma/client')

describe('teste de exame.js', () => {
    //cadastro de exame
    test('should 200 and return correct value', async () => {
        let req = mockRequest();
        req.params.id = 1;
        const res = mockResponse();

        await exame.exame(req, res);

        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send.mock.calls.length).toBe(1);
        expect(res.send).toHaveBeenCalledWith('IM A EXAME CONTROLLER');
    })

    test('should 404 and return correct value', async () => {
        let req = mockRequest();
        req.params.id = null;
        const res = mockResponse();

        await exame.exame(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    })

})