const exame = require('../routes/exame')
const { mockRequest, mockResponse } = require('../util/interceptor')

describe('teste de exame.js', () => {
    //cadastro de paciente
    it('Async test', async done => {
        // Do your async tests here

        done()
    })
    // test('should 200 and return correct value', async () => {
    //     let req = mockRequest();
    //     req.params.id = 1;
    //     const res = mockResponse();

    //     await paciente.paciente(req, res);

    //     expect(res.send).toHaveBeenCalledTimes(1)
    //     expect(res.send.mock.calls.length).toBe(1);
    //     expect(res.send).toHaveBeenCalledWith('IM A PACIENTE CONTROLLER');
    // })

    // test('should 404 and return correct value', async () => {
    //     let req = mockRequest();
    //     req.params.id = null;
    //     const res = mockResponse();

    //     await paciente.paciente(req, res);

    //     expect(res.status).toHaveBeenCalledWith(404);
    //     expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    // })

    //login de paciente


})