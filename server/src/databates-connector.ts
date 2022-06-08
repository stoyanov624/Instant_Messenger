import {DataSource} from "typeorm";
import { User } from "./entities/User";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "some_pass",
  database: "Instant_Messenger",
  entities: [User],
  synchronize: false,
  logging: false,
})

export {AppDataSource};