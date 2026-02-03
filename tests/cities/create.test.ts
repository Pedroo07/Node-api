import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - Create", () => {
  it("Create Register", async () => {
    const res1 = await testServer.post("/cities").send({ nome: "Monte Azul" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("attempt to create a record with a short name", async () => {
    const res2 = await testServer.post("/cities").send({ nome: "Mo" });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty("errors.body.nome");
  });
});
