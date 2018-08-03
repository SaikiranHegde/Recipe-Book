"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var logger = require("morgan");
var helmet = require("helmet");
var compression = require("compression");
var cors = require("cors");
var RecipeRouter_1 = require("./router/RecipeRouter");
// Server Class
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        console.log('Inside config');
        var MONGO_URI = 'mongodb://localhost/recipe_book';
        mongoose.connect(MONGO_URI || process.env.MONGO_URI);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    };
    Server.prototype.routes = function () {
        console.log('Inside Routes');
        this.app.use('/api/recipes', RecipeRouter_1.default);
        // this.app.use('/api/posts', PostRouter);
        // this.app.use('/api/users', UserRouter);
    };
    return Server;
}());
exports.default = new Server().app;
