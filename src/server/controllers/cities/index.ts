import * as create from './getAll'
import * as getAll from './create'

export const CitiesController = {
  ...create,
  ...getAll,
}