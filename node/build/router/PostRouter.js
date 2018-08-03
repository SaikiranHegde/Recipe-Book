"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Post_1 = require("../models/Post");
var PostRouter = /** @class */ (function () {
    function PostRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    PostRouter.prototype.getPosts = function (req, res) {
        console.log('Inside getPosts');
        Post_1.default.find({})
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
    PostRouter.prototype.getPost = function (req, res) {
        var slug = req.params.slug;
        Post_1.default.findOne({ slug: slug })
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
    PostRouter.prototype.createPost = function (req, res) {
        var title = req.body.title;
        var slug = req.body.slug;
        var content = req.body.content;
        var featuredImage = req.body.featuredImage;
        var post = new Post_1.default({
            title: title,
            slug: slug,
            content: content,
            featuredImage: featuredImage
        });
        post.save()
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
    PostRouter.prototype.updatePost = function (req, res) {
        var slug = req.params.slug;
        Post_1.default.findOneAndUpdate({ slug: slug }, req.body)
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
    PostRouter.prototype.deletePost = function (req, res) {
        var slug = req.params.slug;
        Post_1.default.findOneAndRemove({ slug: slug })
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
    PostRouter.prototype.routes = function () {
        this.router.get('/', this.getPosts);
        this.router.get('/:slug', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:slug', this.updatePost);
        this.router.delete('/:slug', this.deletePost);
    };
    return PostRouter;
}());
// Export
var postRoutes = new PostRouter();
postRoutes.routes();
exports.default = postRoutes.router;
