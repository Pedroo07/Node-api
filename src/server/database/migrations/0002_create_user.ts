import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.user, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name").index().notNullable();
      table.string("email").unique().notNullable()
      table.string("password").notNullable().checkLength('>=', 8)
      table.comment("table used to store data in the system");
    })
    .then(() => {
      console.log(`Create Table ${ETableNames.user}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.user).then(() => {
    console.log(`Delete Table ${ETableNames.user}`);
  });
}
