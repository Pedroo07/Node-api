import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUser } from "../../models";

export const getByEmail = async (email: string): Promise<IUser | Error> => {
  try {
    const [result] = await Knex(ETableNames.user).where('email','=', email)
    if(!result){
      return new Error('Not found Person')
    }
    return result
  } catch (error) {
    return new Error("Error");
  }
};