import { Request, Response } from "express";
import z from "zod";
import { validation } from "../../shared/middlewares";

const bodyValidator = z.object({
  name: z.string().min(3),
  state: z.string().min(2),
});
const queryValidator = z.object({
  filter: z.string().min(3),
});
type NewCity = z.infer<typeof bodyValidator>;
export const createValidation = validation(() => ({
  body: bodyValidator,
  query: queryValidator,
}));
export const create = (req: Request<{}, {}, NewCity>, res: Response) => {
  console.log(req.body);

  return res.send("City created");
};
