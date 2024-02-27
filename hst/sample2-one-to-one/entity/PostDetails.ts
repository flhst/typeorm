import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "../../../src";
import {Post} from "./Post";


@Entity("hst_sample2_post_details")
export class PostDetails {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    authorName: string

    @Column()
    comment: string

    @Column()
    metadata: string

    @OneToOne((type) => Post, {
        cascade: true
    })
    post: Post
}
