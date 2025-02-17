import "reflect-metadata"
import { DataSource, DataSourceOptions } from "../../src/index"
import { Post } from "./entity/Post"
import { PostDetails } from "./entity/PostDetails"

const options: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "hushoutao",
    database: "typeorm",
    logging: ["query", "error"],
    synchronize: true,
    entities: [
        Post,
        PostDetails
    ],
}

const dataSource = new DataSource(options)
dataSource.initialize().then(
    (dataSource) => {
        let details = new PostDetails()
        details.authorName = "Umed"
        details.comment = "about post"
        details.metadata = "post,details,one-to-one"

        let post = new Post()
        post.text = "hello how are you?"
        post.title = "hello"
        post.details = details

        let postRepository = dataSource.getRepository(Post)

        postRepository
            .save(post)
            .then((post) => {
                console.log(
                    "Post has been saved. Lets try to find this post using query builder: ",
                )
                return postRepository
                    .createQueryBuilder("post")
                    .where("post.title=:keyword")
                    .setParameter("keyword", "hello")
                    .getMany()
            })
            .then((post) => {
                console.log("Loaded post: ", post)
            })
            .catch((error) => console.log("Cannot save. Error: ", error))
    },
    (error) => console.log("Cannot connect: ", error),
)
