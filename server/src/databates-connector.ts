import {DataSource} from "typeorm";
import { ChatGroup } from "./entities/ChatGroup.entity";
import { Message } from "./entities/Message.entity";
import { User } from "./entities/User.entity";

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.ORM_HOST,
  port: Number(process.env.ORM_PORT),
  username: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DATABASE,
  entities: [process.env.ENTITIES_FOLDER_PATH],
  synchronize: true,
  logging: false,
})

export {AppDataSource};