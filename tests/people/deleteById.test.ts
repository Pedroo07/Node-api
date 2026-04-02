import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("People - deleteById", () => {
  it("Register Delete", async () => {
    const res1 = await testServer.post("/people").send({ name: "Pedroo", email: "pedro@gmail.com", cityId: "1" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer.delete(`/people/${res1.body}`).send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Try deleting a non-existent record.", async () => {
    const res2 = await testServer.delete('/people/99999').send();

    expect(res2.statusCode).toEqual(StatusCodes.NOT_FOUND);
  });
});
