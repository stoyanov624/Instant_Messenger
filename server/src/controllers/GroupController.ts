import { group } from 'console';
import * as express from 'express';
import { AppDataSource } from '../databates-connector';
import { ChatGroup } from '../entities/ChatGroup.entity';
import { User } from '../entities/User.entity';
import { Message } from '../entities/Message.entity';

export class GroupController {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.createRoutes();
    }

    private createRoutes() {
        this.router.get('/messages/:groupId', this.getGroupMessages);
        this.router.post('/messages/:groupId', this.saveMessageToGroup);
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
            response.status(400).send({
                messageErr: authError
            });

        }
    }

    private async generateGroups(request: Express.Request, response: Express.Response){
        
    }

    private async getGroupMessages(response: express.Response, request: express.Request) {
        try {
            const groupId = Number(request.params.groupId);
            const group : ChatGroup = await AppDataSource.manager.findOne(ChatGroup, {
                relations: ['messages'],
                where: {id: groupId}
            }); 

            if(!group) {
                throw new Error("Group not found!");
            }

            response.status(200).send(group.messages);

        } catch (error) {
            console.error(error);
            response.status(500).send({ message: error.message});
        }
    }

    private async saveMessageToGroup(response: express.Response, request: express.Request) {
        try {
            let message : Message = JSON.parse(request.body.message)
            const groupId = Number(request.params.groupId);
            const group : ChatGroup = await AppDataSource.manager.findOne(ChatGroup, {
                relations: ['messages'],
                where: {id: groupId}
            }); 

            if(!group) {
                throw new Error("Group not found!");
            }
            message = await AppDataSource.manager.save(Message, message);
            group.messages.push(message);
            await AppDataSource.manager.save(ChatGroup, group);

            response.status(200).send('Message send!');
        } catch (error) {
            console.error(error);
            response.status(500).send({ message: error.message});
        }
    }
}