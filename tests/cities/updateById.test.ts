import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("cities - updateById", () => {
  it("update register", async () => {
    const res1 = await testServer.post("/cities").send({ name: "Monte Azul" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer
      .put(`/cities/${res1.body}`)
      .send({ name: "Monte" });

    expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Trying to update a non-existent record.", async () => {
    const res1 = await testServer.put("/cities/99999").send({ name: "Monte" });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
