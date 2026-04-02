import { Request, Response, RequestHandler } from "express";
import z from "zod";
import { validation } from "../../shared/middlewares";
import { IUser } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { UserProvider } from "../../database/providers/users";

interface BodyProps extends Omit<IUser, "id"> {}

const bodyValidator: z.ZodType<BodyProps> = z.object({
  name: z.coerce.string().min(3),
  password: z.coerce.string().min(8),
  email: z.email()
});
type NewUser = z.infer<typeof bodyValidator>;
export const SignUpValidation: RequestHandler<{}, any, NewUser> = validation(
  () => ({
    body: bodyValidator,
  }),
) as RequestHandler<{}, any, NewUser>;
export const SignUp = async (req: Request<{}, {}, NewUser>, res: Response) => {
  const result = await UserProvider.createUser(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(201).json(result);
};
