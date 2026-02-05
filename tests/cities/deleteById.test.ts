import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cities - deleteById", () => {
  it("Register Delete", async () => {
    const res1 = await testServer.post("/cities").send({ name: "Monte Azul" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer.delete(`/cities/${res1.body}`).send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Try deleting a non-existent record.", async () => {
    const res2 = await testServer.delete("/cities/99999").send();

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors.default");
  });
});
