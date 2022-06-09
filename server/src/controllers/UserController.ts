import * as express from 'express';
import { AppDataSource } from '../databates-connector';
import { User } from '../entities/User.entity';

class UserController {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.createRoutes();
    }

    private createRoutes() {
        this.router.get("/", this.getAllUsers);
    }

    private async getAllUsers(request: express.Request, response: express.Response) {
        const users = await AppDataSource.manager.createQueryBuilder(User, 'user').getMany();
        response.status(200).send(users);
    }
}

export {UserController};