import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export const updateById = async (id: number, person: Omit<IPerson, "id">) => {
  try {
    const result = await Knex(ETableNames.person)
      .update(person)
      .where("id", "=", id);
    return result;
  } catch (error) {
    return new Error("Error");
  }
};
