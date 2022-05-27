import {Entity, Column, PrimaryColumn, ManyToOne, OneToMany} from "typeorm"
import { Message } from "./Message";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    password: string;

    @OneToMany(
        () => Message,
        message => message.user
    )
    messages: Message[]
}