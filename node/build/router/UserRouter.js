"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../models/User");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    UserRouter.prototype.getUsers = function (req, res) {
        // console.log("Inside getUsers");
        User_1.default.find({})
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
    UserRouter.prototype.getUser = function (req, res) {
        var username = req.params.username;
        User_1.default.findOne({ username: username }).populate('posts', 'title content')
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
    UserRouter.prototype.createUser = function (req, res) {
        var name = req.body.name;
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var posts = req.body.posts;
        var user = new User_1.default({
            name: name,
            username: username,
            email: email,
            password: password,
            posts: posts
        });
        user.save()
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
    UserRouter.prototype.updateUser = function (req, res) {
        var username = req.params.username;
        User_1.default.findOneAndUpdate({ username: username }, req.body)
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
    UserRouter.prototype.deleteUser = function (req, res) {
        var username = req.params.username;
        User_1.default.findOneAndRemove({ username: username })
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
    UserRouter.prototype.routes = function () {
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    };
    return UserRouter;
}());
// Export
var userRoutes = new UserRouter();
userRoutes.routes();
exports.default = userRoutes.router;
