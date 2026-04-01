import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export type PersonQueryParams = {
  page?: number;
  limit?: number;
  filter?: string;
};

export const getAll = async (Person: PersonQueryParams) => {
  try {
    const result = Knex(ETableNames.person).select("*");
    if(typeof Person.limit === 'number'){
      result.limit(Person.limit)
    }if (typeof Person.page === 'number'){
      return result.offset((Person.page - 1) * (await result).length)
    }if(Person.filter){
      result.where('name', 'like', `%${Person.filter}%`)
    }
    else if ((await result).length === 0) {
      return new Error("Not found Person");
    }
    return result
  } catch (error) {
    return new Error("Error");
  }
};
