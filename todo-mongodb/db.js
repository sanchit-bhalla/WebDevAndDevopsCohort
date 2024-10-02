const mongoose= require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String,
}, {timestamps: true})

const TodoSchema = new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean,
}, {timestamps: true})

const UserModal = mongoose.model('User', UserSchema) // collection name will be users
const TodoModal = mongoose.model('Todo', TodoSchema) // collection name will be todos

module.exports = {
    UserModal,
    TodoModal
}