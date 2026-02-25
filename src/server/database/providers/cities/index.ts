import * as create from "./Create";
import * as getById from "./GetById";
import * as getAll from "./GetAll";
import * as updateById from "./UpdateById";
import * as deleteById from "./deleteById";

export const CitiesProvider = {
  ...create,
  ...getById,
  ...getAll,
  ...deleteById,
  ...updateById
};