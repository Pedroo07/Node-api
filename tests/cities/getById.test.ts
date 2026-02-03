import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("cities - getById", () => {
  it("found register by id", async () => {
    const res1 = await testServer.post("/cities").send({ nome: "Monte Azul" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resFound = await testServer.get(`/cities/${res1.body}`).send();

    expect(resFound.statusCode).toEqual(StatusCodes.OK);
    expect(resFound.body).toHaveProperty("nome");
  });
  it("Trying to find a record that doesn t exist.", async () => {
    const res1 = await testServer.get("/cities/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
