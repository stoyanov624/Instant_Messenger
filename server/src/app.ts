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
    console.log('Hi');
    console.log(socket.id);
});

server.listen(PORT, () => console.log(`Server listening at port: ${PORT}`))