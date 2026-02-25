import { Knex } from "./server/database/knex";
import { server } from "./server/server";
const StartServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log("ta funcionando");
  });
};

if (process.env.IS_LOCALHOST !== "true") {
  Knex.migrate.latest().then(() => {
    StartServer()
  }).catch(console.log)
}else{
  StartServer()
}
