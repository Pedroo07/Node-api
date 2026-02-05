import { Request, Response } from "express";
import z from "zod";
import { validation } from "../../shared/middlewares";
import { ICity } from "../../database/models";

interface BodyProps extends Omit<ICity, 'id'> {}

const bodyValidator: z.ZodType<BodyProps> = z.object({
  name: z.coerce.string(),
});
type NewCity = z.infer<typeof bodyValidator>;
export const createValidation = validation(() => ({
  body: bodyValidator,
}));
export const create = (req: Request<{}, {}, NewCity>, res: Response) => {
  console.log(req.body);

  return res.status(201).json(1);
};
