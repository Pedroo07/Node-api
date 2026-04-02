import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("People - getAll", () => {
  it("Found all registers", async () => {
    const res1 = await testServer.post("/people").send({ name: "Pedroo", email: "pedro@gmail.com", cityId: "1" });

    console.log(res1.statusCode);
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resFound = await testServer.get("/people").send();

    expect(Number(resFound.header["x-total-count"])).toBeGreaterThan(0);
    expect(resFound.statusCode).toEqual(StatusCodes.OK);
    expect(resFound.body.length).toBeGreaterThan(0);
  });
});
