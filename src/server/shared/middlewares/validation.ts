import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import z from "zod";
type TFields = "body" | "query" | "params" | "header";
type TGetSchema = <T extends z.ZodType>(schema: T) => T;
type TAllSchemas = {
  body?: z.ZodType;
  query?: z.ZodType;
  params?: z.ZodType;
  header?: z.ZodType;
};
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;
type TValidation = <
  P = any,
  R = any,
  B = any,
  Q = any
>(
  getAllSchemas: TGetAllSchemas
) => RequestHandler<P, R, B, Q>;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const errorsResult: Record<string, Record<string, string>> = {};
  const schemas = getAllSchemas((schema) => schema);
  Object.entries(schemas).forEach(([key, s]) => {
    const result = s.safeParse(req[key as TFields]);
    if (!result.success) {
      const tree = z.flattenError(result.error);
      errorsResult[key] = tree.fieldErrors;
    }
  });
  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult } as any);
  }
};
