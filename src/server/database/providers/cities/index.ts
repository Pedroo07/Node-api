import * as create from "./Create";
import * as getById from "./GetById";
import * as getAll from "./GetAll";

export const CitiesProvider = {
  ...create,
  ...getById,
  ...getAll,
};