import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
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

    @JoinColumn({
        name: 'user_id'
    })
    user: User
}