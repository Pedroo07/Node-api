import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import z from "zod";
import { StatusCodes } from "http-status-codes";

const IdValidator = z.object({
  id: z.coerce.number().gt(0).int().optional(),
});
type QueryProps = z.infer<typeof IdValidator>;
export const getByIdValidation = validation(() => ({
  params: IdValidator,
}));
export const getById = async (req: Request<QueryProps>, res: Response) => {
  if (Number(req.params.id) === 99999)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Register not found",
      },
    });

  return res.status(StatusCodes.OK).json({
    id: req.params.id,
    name: "Monte Azul",
  });
};
