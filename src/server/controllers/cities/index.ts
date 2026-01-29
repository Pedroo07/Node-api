import * as create from './getAll'
import * as getAll from './create'
import * as getById from './getById'
import * as updateById from './updateById'
import * as deleteById from './deleteById'

export const CitiesController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById
}