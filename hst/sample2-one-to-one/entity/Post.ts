import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "../../../src";
import {PostDetails} from "./PostDetails";

@Entity('hst_sample2_post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    text: string

    @OneToOne(() => PostDetails, {
        cascade: ["insert"],
    })
    @JoinColumn()
    details: PostDetails;
}
