import { Request, Response, RequestHandler } from "express";
import { validation } from "../../shared/middlewares";
import z from "zod";
import { StatusCodes } from "http-status-codes";

const IdValidator = z.object({
  id: z.coerce.number().gt(0).int(),
});
type QueryProps = z.infer<typeof IdValidator>;
export const deleteByIdValidation: RequestHandler<QueryProps> = validation(
  () => ({
    params: IdValidator,
  }),
) as RequestHandler<QueryProps>;
export const deleteById: RequestHandler<QueryProps> = async (req, res) => {
  if (Number(req.params.id) === 99999)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Register not found",
      },
    });

  return res.status(StatusCodes.NO_CONTENT).send();
};
