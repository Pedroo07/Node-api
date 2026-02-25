import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise<number | Error> => {
  try {
    const result = await Knex(ETableNames.city).where("id", "=", id).del();
    console.log(result)
    return result
  } catch (error) {
    return new Error("ERROR");
  }
};
