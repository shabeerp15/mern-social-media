import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 500,
        },
        image: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    {timestamps: true}
)

const Post = mongoose.model('Post', postSchema)

export default Post
