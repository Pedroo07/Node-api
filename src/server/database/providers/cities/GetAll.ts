import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export type CityQueryParams = {
  page?: number;
  limit?: number;
  filter?: string;
};

export const getAll = async (City: CityQueryParams) => {
  try {
    const result = Knex(ETableNames.city).select("*");
    if(typeof City.limit === 'number'){
      result.limit(City.limit)
    }if (typeof City.page === 'number'){
      return result.offset((City.page - 1) * (await result).length)
    }if(City.filter){
      result.where('name', 'like', `%${City.filter}%`)
    }
    else if ((await result).length === 0) {
      return new Error("Not found City");
    }
    return result
  } catch (error) {
    return new Error("Error");
  }
};
