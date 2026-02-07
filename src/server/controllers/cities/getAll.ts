import { RequestHandler } from "express";
import { validation } from "../../shared/middlewares";
import z from "zod";
import { StatusCodes } from "http-status-codes";
import { CitiesProvider } from "../../database/providers";

const queryValidator = z.object({
  page: z.coerce.number().gt(0).optional(),
  limit: z.coerce.number().gt(0).optional(),
  filter: z.string().optional(),
});
type QueryProps = z.infer<typeof queryValidator>;
export const getAllValidation: RequestHandler<any, any, any, QueryProps> =
  validation(() => ({
    query: queryValidator,
  })) as RequestHandler<any, any, any, QueryProps>;
export const getAll: RequestHandler<{}, any, {}, QueryProps> = async (
  req,
  res,
) => {
  const result = await CitiesProvider.getAll(req.query);
  res.setHeader("Access-Control-Expose-Headers", "x-total-count");
  res.setHeader("x-total-count", "1");
  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Items not found",
      },
    });

  return res.status(StatusCodes.OK).json(result);
};
