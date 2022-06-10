import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Message } from "./Message.entity";

@Entity('chat_groups')
export class ChatGroup {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    content: string;

    @ManyToMany(
        () => User,
        user => user.messages
    )   
    users: User[]
    
    @OneToMany(
        () => Message,
        message => message.chatgroup
    )
    messages: Message[]
}