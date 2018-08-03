"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var recipeSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('Recipe', recipeSchema);
