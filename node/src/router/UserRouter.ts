import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';

class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getUsers(req: Request, res: Response) {
        // console.log("Inside getUsers");
        User.find({})
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

    public getUser(req: Request, res: Response) {
        const username: String = req.params.username;

        User.findOne({ username }).populate('posts', 'title content')
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

    public createUser(req: Request, res: Response) {
        const name: String = req.body.name;
        const username: String = req.body.username;
        const email: String = req.body.email;
        const password: String = req.body.password;
        const posts: String[] = req.body.posts;

        const user = new User({
            name,
            username,
            email,
            password,
            posts
        });
        user.save()
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

    public updateUser(req: Request, res: Response) {
        const username: String = req.params.username;

        User.findOneAndUpdate({ username }, req.body)
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

    public deleteUser(req: Request, res: Response) {
        const username: String = req.params.username;

        User.findOneAndRemove({ username })
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
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }
}

// Export
const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;
