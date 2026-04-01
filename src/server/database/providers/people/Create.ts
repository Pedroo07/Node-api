import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export const createCity = async (
  person: Omit<IPerson, "id">,
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.person).insert(person).returning("id");
    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }
    return new Error("Error");
  } catch (error) {
    return new Error("Error");
  }
};
