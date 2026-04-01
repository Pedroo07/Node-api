import { Request, Response, RequestHandler } from "express";
import z from "zod";
import { validation } from "../../shared/middlewares";
import { IPerson } from "../../database/models";
import { PeopleProvider } from "../../database/providers";
import { StatusCodes } from "http-status-codes";

interface BodyProps extends Omit<IPerson, "id"> {}

const bodyValidator: z.ZodType<BodyProps> = z.object({
  name: z.coerce.string().min(3),
  cityId: z.coerce.number().int().min(1),
  email: z.email(),
});
type NewCity = z.infer<typeof bodyValidator>;
export const createValidation: RequestHandler<{}, any, NewCity> = validation(
  () => ({
    body: bodyValidator,
  }),
) as RequestHandler<{}, any, NewCity>;
export const create = async (req: Request<{}, {}, NewCity>, res: Response) => {
  const result = await PeopleProvider.createCity(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(201).json(result);
};
