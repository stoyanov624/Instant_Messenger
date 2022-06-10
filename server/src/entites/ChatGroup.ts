import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Message } from "./Message";

@Entity()
export class ChatGroup {
    @PrimaryColumn() 
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