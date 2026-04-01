import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const getById = async (id: number): Promise<Object | Error> => {
  try {
    const [result] = await Knex(ETableNames.person).where('id', id)
    if(!result){
      return new Error('Not found Person')
    }
    return result
  } catch (error) {
    return new Error("Error");
  }
};