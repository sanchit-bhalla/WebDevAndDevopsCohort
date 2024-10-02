const mongoose= require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String,
})

const TodoSchema = new Schema({
    description: String,
    done: Boolean,
    userId: Schema.ObjectId
})