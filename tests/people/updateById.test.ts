import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("People - updateById", () => {
  it("update register", async () => {
    const res1 = await testServer.post("/people").send({name: "Pedroo", email: "pedro@gmail.com", cityId: "1" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer
      .put(`/people/${res1.body}`)
      .send({ name: "Pedroo", email: "pedro@gmail.com", cityId: 1 });

    expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Trying to update a non-existent record.", async () => {
    const res1 = await testServer.put("/people/99999").send({ name: "Piter", email: "pedro@gmail.com", cityId: 1});

    expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
