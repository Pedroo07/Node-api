import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const getById = async (id: number): Promise<Object | Error> => {
  try {
    const [result] = await Knex(ETableNames.city).where('id', id)
    if(!result){
      return new Error('Not found City')
    }
    return result
  } catch (error) {
    return new Error("Error");
  }
};