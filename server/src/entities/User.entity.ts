import {Entity, Column, OneToMany, ManyToMany, PrimaryGeneratedColumn, JoinTable} from "typeorm";
import { ChatGroup } from "./ChatGroup.entity";
import { Message } from "./Message.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    date: Date;

    @OneToMany(
        () => Message,
        message => message.user
    )
    messages: Message[]

    @ManyToMany(() => ChatGroup)
    @JoinTable({
        name: 'chat_groups_users',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'chat_group_id',
            referencedColumnName: 'id'
        }
    })
    chatgroups: ChatGroup[]

    constructor() {
        this.username = '';
        this.password = '';
        this.date = new Date();
    }
}