import {  RequestHandler } from "express";
import { validation } from "../../shared/middlewares";
import z from "zod";
import { StatusCodes } from "http-status-codes";
import { IPerson } from "../../database/models";
import { PeopleProvider } from "../../database/providers";
interface IBodyProps extends Omit<IPerson, "id"> {}

const IdValidator = z.object({
  id: z.coerce.number().gt(0).int(),
});
const bodyValidator: z.ZodType<IBodyProps> = z.object({
  name: z.coerce.string(),
  email:z.email(),
  cityId: z.number().int().min(1)
});
type QueryProps = z.infer<typeof IdValidator>;
type BodyProps = z.infer<typeof bodyValidator>;
export const updateByIdValidation: RequestHandler<QueryProps, any, BodyProps> =
  validation(() => ({
    params: IdValidator,
    body: bodyValidator,
  })) as RequestHandler<QueryProps, any, BodyProps>;
export const updateById: RequestHandler<QueryProps, any, BodyProps> = async (
  req,
  res,
) => {
  const result = await PeopleProvider.updateById(req.params.id, req.body);
  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });

  if (result === 0)
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: "Register not found",
      },
    });

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
