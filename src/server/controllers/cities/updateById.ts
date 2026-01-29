import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import z from "zod";

const IdValidator = z.object({
 id: z.coerce.number().gt(0).int().optional()
});
const IdBodyValidator = z.object({
name: z.string().min(3)
});
type QueryProps = z.infer<typeof IdValidator>;
type BodyProps = z.infer<typeof IdBodyValidator>;
export const updateByIdValidation = validation(() => ({
  params: IdValidator,
  body: IdBodyValidator
}));
export const updateById = async (req: Request<QueryProps, {}, BodyProps>, res: Response) => {
  console.log(req.params.id);
  console.log(req.body.name);

  return res.send("getById");
};
 