import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const updateById = async (id: number, city: Omit<ICity, "id">) => {
  try {
    const result = await Knex(ETableNames.city)
      .update(city)
      .where("id", "=", id);
    return result;
  } catch (error) {
    return new Error("Error");
  }
};
