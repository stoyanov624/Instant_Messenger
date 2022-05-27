import express, {Application, Request, Response, NextFunction} from 'express';
import "reflect-metadata"

const app : Application = express();

app.get('/', (req : Request, res : Response) => {
    res.send('Hello world!');
})
const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening at port: ${PORT}`))