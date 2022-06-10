require('dotenv').config();
import express, {Application} from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { AppDataSource } from './databates-connector';
import { MainRouter } from './router/MainRouter';
import "reflect-metadata"

const app : Application = express(); 
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {cors: {origin: ['http://localhost:8080']}});

AppDataSource.initialize().then(() => {
    io.on('connection', socket => {
        socket.on('send-message', (message : string, chatroomId: number) => {
            socket.to(chatroomId.toString()).emit('receive-message', message);
        })

        socket.on('join-rooms', (chatRooms: Array<number>) => {
            for (const chatRoom of chatRooms) {
                socket.join(chatRoom.toString());
            }
        })
    });
    const mainRouter : MainRouter = new MainRouter();
    app.use(mainRouter.router);
    server.listen(process.env.PORT, () => console.log(`Server listening at port: ${process.env.PORT}`))

}).catch(error => console.log(error));
