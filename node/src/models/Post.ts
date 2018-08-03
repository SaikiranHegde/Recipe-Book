import { Schema, model } from 'mongoose';

let postSchema: Schema = new Schema({
    createdAt: Date,
    updatedAt: Date,
    title: {
        type: String,
        default: '',
        required: true
    },
    slug: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    content: {
        type: String,
        default: '',
        required: true
    },
    featuredImage: {
        type: String,
        default: ''
    }
});

export default model('Post', postSchema);