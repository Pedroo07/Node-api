import { RequestHandler } from "express";
import z, { flattenError } from "zod";
type TFields = "body" | "query" | "params" | "header";
type TGetSchema = <T>(schema: z.infer<T>) => z.infer<T>;
type TAllSchemas = Record<TFields, z.infer<any>>;
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;
type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation =
  (getAllSchemas) => async (req, res, next) => {
    const errorsResult: Record<string, Record<string, string>> = {};
    const schemas = getAllSchemas((schema) => schema);
    Object.entries(schemas).forEach(([key, s]) => {
      const result = s.safeParse(req[key as TFields]);
      if (!result.success) {
        const tree = flattenError(result.error);
        errorsResult[key] = tree.fieldErrors;
      }
    });
    if (Object.entries(errorsResult).length === 0) {
      return next();
    } else {
      return res.status(400).json({ errors: errorsResult });
    }
  };
