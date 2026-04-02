import { RequestHandler } from "express";
import z from "zod";
import { StatusCodes } from "http-status-codes";
import { UserProvider } from "../../database/providers/users";
import { IUser } from "../../database/models";
import { validation } from "../../shared/middlewares";

interface BodyProps extends Omit<IUser, "id" | "name"> {}

const bodyValidator: z.ZodType<BodyProps> = z.object({
  password: z.coerce.string().min(8),
  email: z.email()
});
type User = z.infer<typeof bodyValidator>;

export const signInValidation: RequestHandler<{}, any, User> = validation(
  () => ({
    body: bodyValidator,
  }),
) as RequestHandler<{}, any, User>;

export const SignIn: RequestHandler<User> = async (req, res) => {
  const { email, password } = req.body;
  const result = await UserProvider.getByEmail(email);
  if (result instanceof Error)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email and password incorrect",
      },
    });
if(result.password !== password) {
  return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email and password incorrect",
      },
    });
}else{
  return res.status(StatusCodes.OK).json({acessToken: "teste.teste.tete"});
}

};
