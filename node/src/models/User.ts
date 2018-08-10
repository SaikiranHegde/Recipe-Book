import { Schema, model } from 'mongoose';

let userSchema: Schema = new Schema({
    email: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: '',
        required: true
    }
});

export default model('User', userSchema);