import mongoose from "mongoose";

const Posts = new mongoose.Schema({
    name: {type:String, required:true},
    prompt: {type:String, required:true},
    photo:{type:String, reqired:true}
})

const PostsSchema = mongoose.model('Posts', Posts)

export default PostsSchema;