require('dotenv').config();
import express, {Application} from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { AppDataSource } from './databates-connector';
import { MainRouter } from './router/MainRouter';
import bodyParser from 'body-parser';
import "reflect-metadata"
import { ChatGroup } from './entities/ChatGroup.entity';

const app : Application = express(); 

app.use(cors({origin: ['http://localhost:8080']}))

const server = createServer(app);
const io = new Server(server, {cors: {origin: ['http://localhost:8080']}});

AppDataSource.initialize().then(() => {
    io.on('connection', socket => {
        socket.on('send-message', (message : string, chatroomId: number) => {
            socket.to(chatroomId.toString()).emit('receive-message', message);
        })

        socket.on('join-rooms', (chatRooms: Array<ChatGroup>) => {
            for (const chatRoom of chatRooms) {
                socket.join((chatRoom.id).toString());
            }
        })
    });
    app.use(express.json())

    const mainRouter : MainRouter = new MainRouter();
    app.use(mainRouter.router);
    server.listen(process.env.PORT, () => console.log(`Server listening at port: ${process.env.PORT}`))

}).catch(error => console.log(error));
