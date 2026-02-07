import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export type CityQueryParams = {
  page?: number;
  limit?: number;
  filter?: string;
};

export const getAll = async (City: CityQueryParams) => {
  try {
    const result = await Knex(ETableNames.city).select("*");
    if (result.length === 0) {
      return new Error("Not found City");
    }
    return result
  } catch (error) {
    return new Error("Error");
  }
};
