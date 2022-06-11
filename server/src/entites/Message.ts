import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ChatGroup } from "./ChatGroup";
import { User } from "./User";

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    content: string;

    @Column()
    isPrivate: boolean;

    @Column() 
    date: Date;

    @ManyToOne(
        () => User,
        user => user.messages
    )   

    @ManyToOne(
        () => ChatGroup,
        chatgroup => chatgroup.messages
    )

    @JoinColumn({
        name: 'user_id'
    })
    user: User

    @JoinColumn({
        name: 'chatgroup_id'
    })
    chatgroup: ChatGroup
    
}