import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import z from "zod";

const queryValidator = z.object({
 page: z.coerce.number().gt(0).optional(),
 limit: z.coerce.number().gt(0).optional(),
 filter: z.string().optional(),
});
type QueryProps = z.infer<typeof queryValidator>;
export const getAllValidation = validation(() => ({
  query: queryValidator
}));
export const getAll = async (req: Request<{}, {}, {}, QueryProps>, res: Response) => {
  console.log(req.query.page);

  return res.send("Minas gerais inteiro");
};
