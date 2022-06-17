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
        this.router.post('/messages', this.saveMessageToGroup);
        this.router.post('/join', this.assignUser)
    }

    private async assignUser(request: express.Request, response: express.Response){
        try {
            const username = request.body.username;
            const groupId = request.body.groupId;

            const user : User = await AppDataSource.manager.findOne(User, {
                where: {username: username}
            })

            const group : ChatGroup = await AppDataSource.manager.findOne(ChatGroup, {
                relations: ["users"],
                where: {id: groupId}
            })
            
            if (group) {
                if (!group.users.find(e => e.username == user.username)) {
                    group.users.push(user);

                    const joinedGroup = await AppDataSource.manager.save(ChatGroup, group);
                    response.status(200).send(joinedGroup);
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

    private async getGroupMessages(request: express.Request, response: express.Response) {
        try {
            const groupId = Number(request.params.groupId);
            const group : ChatGroup = await AppDataSource.manager.findOne(ChatGroup, {
                relations: ['messages'],
                where: {id: groupId},
                order: {id: 'ASC'}
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

    private async saveMessageToGroup(request: express.Request, response: express.Response) {
        try {
            let message : Message = request.body.message;
            const group : ChatGroup = await AppDataSource.manager.findOne(ChatGroup, {
                where: {id: message.chatGroupId}
            }); 

            if(!group) {
                throw new Error("Group not found!");
            }
            message = await AppDataSource.manager.save(Message, message);

            response.status(200).send('Message send!');
        } catch (error) {
            console.error(error);
            response.status(500).send({ message: error.message});
        }
    }
}