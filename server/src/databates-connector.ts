import {DataSource} from "typeorm";
import { User } from "./entities/User";

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.ORM_HOST,
  port: Number(process.env.ORM_PORT),
  username: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DATABASE,
  entities: [User],
  synchronize: false,
  logging: false,
})

export {AppDataSource};