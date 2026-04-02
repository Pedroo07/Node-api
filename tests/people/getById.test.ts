import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("People - getById", () => {
  it("found register by id", async () => {
    const res1 = await testServer.post("/people").send({ name: "Pedroo", email: "pedro@gmail.com", cityId: "1" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resFound = await testServer.get(`/people/${res1.body}`).send();

    expect(resFound.statusCode).toEqual(StatusCodes.OK);
    expect(resFound.body).toHaveProperty("name");
  });
  it("Trying to find a record that doesn t exist.", async () => {
    const res1 = await testServer.get("/people/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
