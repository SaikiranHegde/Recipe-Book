"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Recipe_1 = require("../models/Recipe");
var RecipeRouter = /** @class */ (function () {
    function RecipeRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    RecipeRouter.prototype.getRecipes = function (req, res) {
        Recipe_1.default.find({})
            .then(function (data) { return res.json(data); })
            .catch(function (error) { return res.json(error); });
    };
    RecipeRouter.prototype.storeRecipes = function (req, res) {
        console.log("Inside storeRecipes");
        var array = req.body;
        array.forEach(function (element) {
            var name = element.name;
            var description = element.description;
            var imagePath = element.imagePath;
            var ingredients = element.ingredients;
            var recipe = new Recipe_1.default({
                name: name,
                description: description,
                imagePath: imagePath,
                ingredients: ingredients
            });
            recipe.save()
                .then(function (data) {
                var status = res.statusCode;
                res.json({
                    status: status,
                    data: data
                });
            })
                .catch(function (error) {
                var status = res.statusCode;
                res.json({
                    status: status,
                    error: error
                });
            });
        });
    };
    RecipeRouter.prototype.routes = function () {
        this.router.get('/', this.getRecipes);
        this.router.post('/', this.storeRecipes);
    };
    return RecipeRouter;
}());
var recipeRoutes = new RecipeRouter();
recipeRoutes.routes();
exports.default = recipeRoutes.router;
