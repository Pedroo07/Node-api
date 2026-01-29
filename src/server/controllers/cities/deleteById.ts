import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import z from "zod";

const IdValidator = z.object({
 id: z.coerce.number().gt(0).int().optional()
});
type QueryProps = z.infer<typeof IdValidator>;
export const deleteByIdValidation = validation(() => ({
  params: IdValidator
}));
export const deleteById = async (req: Request<QueryProps>, res: Response) => {
  console.log(req.params);

  return res.send("deleteById");
};
 