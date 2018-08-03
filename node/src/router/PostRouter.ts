import { Router, Request, Response, NextFunction } from 'express';
import Post from '../models/Post';

class PostRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getPosts(req: Request, res: Response) {
        console.log('Inside getPosts');
        
        Post.find({})
        .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
        .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        });
    }

    public getPost(req: Request, res: Response) {
        const slug: String = req.params.slug;

        Post.findOne({ slug })
        .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
        .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        });
    }

    public createPost(req: Request, res: Response) {
        const title: String = req.body.title;
        const slug: String = req.body.slug;
        const content: String = req.body.content;
        const featuredImage: String = req.body.featuredImage;

        const post = new Post({
            title,
            slug,
            content,
            featuredImage
        });
        post.save()
        .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
        .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        });
    }

    public updatePost(req: Request, res: Response) {
        const slug: String = req.params.slug;

        Post.findOneAndUpdate({ slug }, req.body)
        .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
        .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        });
    }

    public deletePost(req: Request, res: Response) {
        const slug: String = req.params.slug;

        Post.findOneAndRemove({ slug })
        .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
        .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        });
    }

    public routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:slug', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:slug', this.updatePost);
        this.router.delete('/:slug', this.deletePost);
    }
}

// Export
const postRoutes = new PostRouter();
postRoutes.routes();

export default postRoutes.router;
