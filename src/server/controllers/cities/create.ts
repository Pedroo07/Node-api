import { Request, Response } from "express"
import z, { treeifyError, ZodError } from "zod"

const bodyValidator = z.object({
  name: z.string().min(3)
})
type NewCity = z.infer<typeof bodyValidator>
export const create =  (req: Request<{}, {}, NewCity >, res: Response) => {
  try{
     bodyValidator.parse(req.body)
  }catch{
    const tree = z.treeifyError(bodyValidator.safeParse(req.body).error!)
    return res.status(400).json({errors: {
     default: tree.properties?.name?.errors
    }})
  }
  console.log(req.body.name)
}