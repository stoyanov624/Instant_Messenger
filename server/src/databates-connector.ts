import {DataSource} from "typeorm";
import { ChatGroup } from "./entities/ChatGroup.entity";
import { Message } from "./entities/Message.entity";
import { User } from "./entities/User.entity";

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'Instant_Messenger',
  entities: [ChatGroup, Message, User],
  synchronize: true,
  logging: false,
})

export {AppDataSource};