import express, {Application, Request, Response} from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app : Application = express(); 
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {cors: {origin: ['http://localhost:8080']}});

const PORT = 3000;

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

server.listen(PORT, () => console.log(`Server listening at port: ${PORT}`))