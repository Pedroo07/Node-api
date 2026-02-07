import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import z from "zod";
import { StatusCodes } from "http-status-codes";
import { CitiesProvider } from "../../database/providers";
import { ValidatedRequest } from "express-zod-safe";

export const queryValidator = {
  page: z.coerce.number().gt(0).optional(),
  limit: z.coerce.number().gt(0).optional(),
  filter: z.string().optional(),
};
type GetAllCityRequest = ValidatedRequest<{query: typeof queryValidator}>;
export const getAll = async (
  req: GetAllCityRequest,
  res:Response
) => {
  console.log(req.query)
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
