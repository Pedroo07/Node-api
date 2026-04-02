import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Users - SignIn", () => {
  it("found register", async () => {
  const res1 = await testServer.post("/signUp").send({ email: "pedro@gmail.com", password: "a1asdsde12@", name: "Pedroo" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resFound = await testServer.post(`/signIn`).send({ email: "pedro@gmail.com", password: "a1asdsde12@"});

    expect(resFound.statusCode).toEqual(StatusCodes.OK);
    expect(resFound.body).toHaveProperty("acessToken");
  });
  it("Email and password incorrect.", async () => {
    const res1 = await testServer.post("/signIn").send({ email: "em@il.com", password: "1222"});

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
