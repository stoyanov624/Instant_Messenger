import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ChatGroup } from "./ChatGroup.entity";
import { User } from "./User.entity";

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    content: string;

    @CreateDateColumn() 
    date: Date;

    @ManyToOne(
        () => User,
        user => user.messages
    )
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user: User   

    @ManyToOne(
        () => ChatGroup,
        chatgroup => chatgroup.messages
    )

    @JoinColumn({
        name: 'chatgroup_id',
        referencedColumnName: 'id'
    })
    chatgroup: ChatGroup

    @Column({name: 'chatgroup_id'})
    chatGroupId: number;

    @Column({name: 'user_id'})
    userId: number;
    
}