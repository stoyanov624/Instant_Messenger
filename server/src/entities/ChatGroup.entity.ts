import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Message } from "./Message.entity";

@Entity('chat_groups')
export class ChatGroup {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    content: string;

    @ManyToMany(() => User)
    @JoinTable({
        name: 'chat_groups_users',
        joinColumn: {
            name: 'chat_group_id',
            referencedColumnName: 'id'
        }, 
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    users: User[]
    
    @OneToMany(
        () => Message,
        message => message.chatgroup
    )
    messages: Message[]
}