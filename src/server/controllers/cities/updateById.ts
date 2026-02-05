import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import z from "zod";
import { StatusCodes } from "http-status-codes";
import { ICity } from "../../database/models";
interface IBodyProps extends Omit<ICity, 'id'> {}

const IdValidator = z.object({
  id: z.coerce.number().gt(0).int().optional(),
});
const bodyValidator: z.ZodType<IBodyProps> = z.object({
  name: z.coerce.string(),
});
type QueryProps = z.infer<typeof IdValidator>;
type BodyProps = z.infer<typeof bodyValidator>;
export const updateByIdValidation = validation(() => ({
  params: IdValidator,
  body: bodyValidator,
}));
export const updateById = async (
  req: Request<QueryProps, {}, BodyProps>,
  res: Response,
) => {
  if (Number(req.params.id) === 99999)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Register not found",
      },
    });

  return res.status(StatusCodes.NO_CONTENT).send();
};
