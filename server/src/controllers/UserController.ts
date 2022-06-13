import * as express from 'express';
import { AppDataSource } from '../databates-connector';
import { User } from '../entities/User.entity';
import bcrypt from 'bcrypt';

class UserController {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.createRoutes();
    }

    private createRoutes() {
        this.router.get('/', this.getAllUsers);
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
    }

    private async getAllUsers(request: express.Request, response: express.Response) {
        const users = await AppDataSource.manager.createQueryBuilder(User, 'user').getMany();
        response.status(200).send(users);
    }

    private async login(request: express.Request, response: express.Response) {
        try {
            console.log(request.body);
            response.status(200).send('OK');
        } catch(error) {
        }
    }

    private async register(request: express.Request, response: express.Response) {
        try {
            const hashedPassword = await bcrypt.hash(request.body.password, 10);
            const user : User = new User();
            user.username = request.body.username;
            user.password = hashedPassword;
            user.email = request.body.email;
            
            await AppDataSource.manager.save(User, user);
            delete(user.password);
            response.status(200).send(user);
        } catch(error) {

        }
    }
}

export {UserController};