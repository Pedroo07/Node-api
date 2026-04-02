import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("SignUp - Register", () => {
  it("Register User", async () => {
    const res1 = await testServer.post("/signUp").send({ name: "Pedroo", email: "pedro@gmail.com", password: "1452ass21" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("attempt to create a record with a short name", async () => {
    const res2 = await testServer.post("/signUp").send({ name: "Pe", email: "pedromoa", password: "1243" });

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors");
  });
});
