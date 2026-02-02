import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import z from "zod";
import { StatusCodes } from "http-status-codes";

const queryValidator = z.object({
  page: z.coerce.number().gt(0).optional(),
  limit: z.coerce.number().gt(0).optional(),
  filter: z.string().optional(),
});
type QueryProps = z.infer<typeof queryValidator>;
export const getAllValidation = validation(() => ({
  query: queryValidator,
}));
export const getAll = async (
  req: Request<{}, {}, {}, QueryProps>,
  res: Response,
) => {
  res.setHeader("Access-Control-Expose-Headers", "x-total-count");
  res.setHeader("x-total-count", "1");

  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      name: "Monte Azul",
    },
  ]);
};
