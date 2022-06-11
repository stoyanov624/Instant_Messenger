import {Entity, Column, OneToMany, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { ChatGroup } from "./ChatGroup";
import { Message } from "./Message";

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

    @OneToMany(
        () => Message,
        message => message.user
    )
    messages: Message[]

    @ManyToMany(
        () => ChatGroup,
        chatgroup => chatgroup.users
    )
    chatgroups: ChatGroup[]
}