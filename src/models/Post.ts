import * as mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    headerImage: String,
    tags: [{String}],
    body: String,
    publishDate: Date,
    lastUpdate: Date,
    author: mongoose.Schema.Types.ObjectId,
    isPublished: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Post', PostSchema);
