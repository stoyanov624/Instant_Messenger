import * as express from 'express';
import { AppDataSource } from '../databates-connector';
import { User } from '../entities/User.entity';
import bcrypt from 'bcrypt';
import { ChatGroup } from '../entities/ChatGroup.entity';
import { chdir } from 'process';

export class UserController {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.createRoutes();
    }

    private createRoutes() {
        this.router.get('/', this.getAllUsers);
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
        this.router.post('/addGroup', this.addGroup);
    }

    private async getAllUsers(request: express.Request, response: express.Response) {
        const users = await AppDataSource.manager.createQueryBuilder(User, 'user').getMany();
        response.status(200).send(users);
    }

    private async login(request: express.Request, response: express.Response) {
        try {
            const username = request.body.username;
            const user : User = await AppDataSource.manager.findOne(User, {
                relations: ['chatgroups'],
                where: {username: username}
            }); 
            if (user) {
                const correctPassword = await bcrypt.compare(request.body.password, user.password);
                if (correctPassword) {
                    delete(user.password);
                    response.status(200).send(user);
                } else {
                    response.status(200).send('Wrong password');
                }
            } else {
                response.status(200).send('Wrong username');
            }

        } catch(error) {
            console.error(error);
            response.status(500).send({ error: error.message});
        }
    }

    private async register(request: express.Request, response: express.Response) {
        try {
            const hashedPassword = await bcrypt.hash(request.body.password, 10);
            const user : User = new User();
            user.username = request.body.username;
            user.password = hashedPassword;
            user.email = request.body.email;
            user.chatgroups = [];

            await AppDataSource.manager.save(User, user);
            delete(user.password);
            response.status(200).send(user);
        } catch(error) {
            console.error(error);
            response.status(500).send({ message: error.message});
        }
    }

    private async addGroup(request: express.Request, response: express.Response) {
        try {
            const user : User = JSON.parse(request.body.userObject);
            let newGroup : ChatGroup = new ChatGroup();
            newGroup.content = request.body.groupName;
            newGroup.users = [user];
            newGroup = await AppDataSource.manager.save(ChatGroup, newGroup);
            
            response.status(200).send(newGroup);
        } catch (error) {
            console.log(error);
        }
    }
}