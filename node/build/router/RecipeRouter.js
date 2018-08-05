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
    RecipeRouter.prototype.storeRecipe = function (req, res) {
        var name = req.params.name;
        Recipe_1.default.findOneAndUpdate({ name: name }, req.body, { new: true, upsert: true })
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
    };
    RecipeRouter.prototype.routes = function () {
        this.router.get('/', this.getRecipes);
        this.router.put('/:name', this.storeRecipe);
    };
    return RecipeRouter;
}());
var recipeRoutes = new RecipeRouter();
recipeRoutes.routes();
exports.default = recipeRoutes.router;
