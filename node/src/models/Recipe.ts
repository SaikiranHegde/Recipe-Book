import { Schema, model } from 'mongoose';

let recipeSchema: Schema = new Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    description: {
        type: String,
        default: '',
        required: true
    },
    imagePath: {
        type: String,
        default: '',
        required: true
    },
    ingredients: [{
        name: String,
        amount: Number
    }]
});

export default model('Recipe', recipeSchema);