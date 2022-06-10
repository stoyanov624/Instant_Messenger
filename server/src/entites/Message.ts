import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ChatGroup } from "./ChatGroup";
import { User } from "./User";

@Entity()
export class Message {
    @PrimaryColumn() 
    id: number;

    @Column()
    content: string;

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