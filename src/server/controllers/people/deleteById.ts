import { Response } from "express";
import z from "zod";
import { StatusCodes } from "http-status-codes";
import { PeopleProvider } from "../../database/providers";
import { ValidatedRequest } from "express-zod-safe";

export const IdValidator = z.object({
  id: z.coerce.number().gt(0).int(),
});

type GetIdCityRequest = ValidatedRequest<{params: typeof IdValidator}>

export const deleteById = async (req: GetIdCityRequest, res: Response) => {
  const result = await PeopleProvider.deleteById(req.params.id);
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

  return res.status(StatusCodes.NO_CONTENT).send();
};
