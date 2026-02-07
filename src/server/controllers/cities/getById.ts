import { RequestHandler } from "express";
import { validation } from "../../shared/middlewares";
import z from "zod";
import { StatusCodes } from "http-status-codes";
import { CitiesProvider } from "../../database/providers";

const IdValidator = z.object({
  id: z.coerce.number().gt(0).int(),
});
type QueryProps = z.infer<typeof IdValidator>;
export const getByIdValidation: RequestHandler<QueryProps> = validation(() => ({
  params: IdValidator,
})) as RequestHandler<QueryProps>;
export const getById: RequestHandler<QueryProps> = async (req, res) => {
  const result = await CitiesProvider.getById(req.params.id);
  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Item not found",
      },
    });

  return res.status(StatusCodes.OK).json(result);
};
