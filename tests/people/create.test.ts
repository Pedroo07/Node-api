import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - Create", () => {
  it("Create Register", async () => {
    const res1 = await testServer.post("/people").send({ name: "Pedroo", email: "pedro@gmail.com", cityId: "1" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("attempt to create a record with a short name", async () => {
    const res2 = await testServer.post("/people").send({ name: "Pe", email: "pedromoa", cityId: "0" });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty("errors");
  });
});
