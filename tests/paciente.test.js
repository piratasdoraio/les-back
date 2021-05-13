const paciente = require('../routes/paciente')
const { mockRequest, mockResponse } = require('../util/interceptor')

describe('teste de paciente.js', () => {
    //cadastro de paciente
    test('should 200 and return correct value', async () => {
        let req = mockRequest();
        req.params.id = 1;
        const res = mockResponse();

        await paciente.paciente(req, res);

        expect(res.send).toHaveBeenCalledTimes(1)
        expect(res.send.mock.calls.length).toBe(1);
        expect(res.send).toHaveBeenCalledWith('IM A PACIENTE CONTROLLER');
    })

    test('should 404 and return correct value', async () => {
        let req = mockRequest();
        req.params.id = null;
        const res = mockResponse();

        await paciente.paciente(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    })

    //login de paciente

})