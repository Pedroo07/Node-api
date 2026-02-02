import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('cities - getAll', () => {

  it('Found all registers', async () => {

    const res1 = await testServer
      .post('/cities')
      .send({ nome: 'Monte Azul' });

      console.log(res1.statusCode)
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resFound = await testServer
      .get('/cities')
      .send();

    expect(Number(resFound.header['x-total-count'])).toBeGreaterThan(0);
    expect(resFound.statusCode).toEqual(StatusCodes.OK);
    expect(resFound.body.length).toBeGreaterThan(0);
  });
});