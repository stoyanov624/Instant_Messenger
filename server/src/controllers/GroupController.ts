import { group } from 'console';
import * as express from 'express';
import { AppDataSource } from '../databates-connector';
import { ChatGroup } from '../entities/ChatGroup.entity';
import { User } from '../entities/User.entity';

export class GroupController {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.createRoutes();
    }

    private createRoutes() {
        this.router.get('/messages/:groupId');
        this.router.post('/messages/:groupId');
        this.router.post('/:userId');
        this.router.post('/join', this.assignUser)
    }

    private async assignUser(request: express.Request, response: express.Response){
        try {
            const username = request.body.username;
            const groupId = request.body.groupId;

            const user : User = await AppDataSource.manager.findOne(User, {
                where: {username: username}
            })
            console.log(groupId);
            console.log(user);
            const group : ChatGroup = await AppDataSource.manager.findOne(ChatGroup, {
                relations: ["users"],
                where: {id: groupId}
            })

            console.log(group);
            if (group) {
                if (!group.users.find(e => e.username == user.username)) {
                    group.users.push(user);

                    await AppDataSource.manager.save(ChatGroup, group);
                    response.status(200);
                } else {
                    throw "You are already in this group!";
                }
            } else {
                throw "The group does not exists!";
            }
        } catch (authError) {
            console.log(authError);
            response.status(400).send({
                messageErr: authError
            });

        }
    }

    private async generateGroups(request: Express.Request, response: Express.Response){
        
    }
}