"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jwt = require("jsonwebtoken");
var User_1 = require("../models/User");
//var jwt = require('jsonwebtoken');
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.secret = 'secret7';
        this.router = express_1.Router();
        this.routes();
    }
    // public getUsers(req: Request, res: Response) {
    //     // console.log("Inside getUsers");
    //     User.find({})
    //     .then((data) => {
    //         const status = res.statusCode;
    //         res.json({
    //             status,
    //             data
    //         });
    //     })
    //     .catch((error) => {
    //         const status = res.statusCode;
    //         res.json({
    //             status,
    //             error
    //         });
    //     });
    // }
    // public getUser(req: Request, res: Response) {
    //     const username: String = req.params.username;
    //     User.findOne({ username }).populate('posts', 'title content')
    //     .then((data) => {
    //         const status = res.statusCode;
    //         res.json({
    //             status,
    //             data
    //         });
    //     })
    //     .catch((error) => {
    //         const status = res.statusCode;
    //         res.json({
    //             status,
    //             error
    //         });
    //     });
    // }
    UserRouter.prototype.createUser = function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        //console.log('This Output' + email + ' ' + password);
        var user = new User_1.default({
            email: email,
            password: password
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
    UserRouter.prototype.signinUser = function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        // console.log(this.secret);
        User_1.default.findOne({ email: email, password: password })
            .then(function (data) {
            console.log('Inside data: ' + data.toJSON().email);
            // console.log(this.secret);
            var status = res.statusCode;
            var token = jwt.sign({
                email: data.toJSON().email
            }, 'secret7', {
                expiresIn: '24h'
            });
            // console.log(token);
            res.json({
                status: status,
                token: token
            });
        })
            .catch(function (error) {
            console.log('Inside Error');
            var status = res.statusCode;
            res.json({
                status: status,
                error: error
            });
        });
    };
    // public updateUser(req: Request, res: Response) {
    //     const username: String = req.params.username;
    //     User.findOneAndUpdate({ username }, req.body)
    //     .then((data) => {
    //         const status = res.statusCode;
    //         res.json({
    //             status,
    //             data
    //         });
    //     })
    //     .catch((error) => {
    //         const status = res.statusCode;
    //         res.json({
    //             status,
    //             error
    //         });
    //     });
    // }
    // public deleteUser(req: Request, res: Response) {
    //     const username: String = req.params.username;
    //     User.findOneAndRemove({ username })
    //     .then((data) => {
    //         const status = res.statusCode;
    //         res.json({
    //             status,
    //             data
    //         });
    //     })
    //     .catch((error) => {
    //         const status = res.statusCode;
    //         res.json({
    //             status,
    //             error
    //         });
    //     });
    // }
    UserRouter.prototype.routes = function () {
        // this.router.get('/', this.getUsers);
        // this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.post('/authenticate', this.signinUser);
        // this.router.put('/:username', this.updateUser);
        // this.router.delete('/:username', this.deleteUser);
    };
    return UserRouter;
}());
// Export
var userRoutes = new UserRouter();
userRoutes.routes();
exports.default = userRoutes.router;
