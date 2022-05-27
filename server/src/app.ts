import express, {Application, Request, Response, NextFunction} from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app : Application = express(); 
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {cors: {origin: ['http://localhost:8080']}});

const PORT = 3000;

app.get('/', (req : Request, res : Response) => {
    res.send('Hello world!');
})

io.on('connection', socket => {
    console.log(`User socket -> ${socket.id}`);
    socket.on('send-message', (message : string, receiver: string) => {
        console.log(message);
        console.log(receiver);
        socket.to(receiver).emit('receive-message', message);
    })

    socket.on('join-room', (username : string) => {
        socket.join(username);
    })

    socket.on('create-room', (username : string) => {
        socket.join(username);
    })
});

server.listen(PORT, () => console.log(`Server listening at port: ${PORT}`))