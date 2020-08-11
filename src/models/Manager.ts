import * as mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    email: String,
    bio: String
});

export default mongoose.model('Manager', ManagerSchema);