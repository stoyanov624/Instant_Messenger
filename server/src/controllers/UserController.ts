import * as express from 'express';
import { AppDataSource } from '../databates-connector';
import { User } from '../entities/User.entity';
import bcrypt from 'bcrypt';
import { ChatGroup } from '../entities/ChatGroup.entity';

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

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
                    throw "Wrong Password";
                    //response.status(200).send('Wrong password');
                }
            } else {
                throw "Wrong username";
                //response.status(200).send('Wrong username');
            }

        } catch(authError) {
            //console.error(error);
           // response.status(500).send({ error: error.message});

            response.status(400).send({
                messageErr: authError
            });
        }
    }

    private async register(request: express.Request, response: express.Response) {
        try {
            const username = request.body.username;
            const password = request.body.password;
            const email = request.body.email;

            if (!username || username.length < 3 || username.length > 100) {
                throw "Make sure your username is more than 3 characters and less than 100";
            }  
            if (!password || password.length < 4 || password.length > 50) {
                throw "Make sure your password is more than 6 characters and less than 50";
            }
            if(!email || !validateEmail(email)) {
                throw "Invalid email. Please make sure is in correct format!";
            }

            let foundUser = await AppDataSource.manager.findOne(User, {
                where: {username: username}
            });

            if(foundUser) {
                throw "There is already a user with such username";
            }

            foundUser = await AppDataSource.manager.findOne(User, {
                where: {email: email}
            });

            if(foundUser) {
                throw "There is already a user with such email";
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user : User = new User();

            user.username = request.body.username;
            user.password = hashedPassword;

            user.email = request.body.email;
            user.chatgroups = [];

            await AppDataSource.manager.save(User, user);
            delete(user.password);
            response.status(200).send(user);
        } catch(authError) {
            response.status(400).send({
                messageErr: authError
            });
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