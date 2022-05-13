import express, {Application, Request, Response, NextFunction} from 'express';

const app : Application = express();

app.get('/', (req : Request, res : Response) => {
    res.send('Hello world!');
})
const PORT = 8080;
app.listen(PORT, () => console.log(`Server listening at port: ${PORT}`))