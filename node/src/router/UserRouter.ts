import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';

//var jwt = require('jsonwebtoken');

class UserRouter {
    router: Router;
    secret: string;

    constructor() {
        this.secret = 'secret7';
        this.router = Router();
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

    public createUser(req: Request, res: Response) {
        const email: String = req.body.email;
        const password: String = req.body.password;
        
        //console.log('This Output' + email + ' ' + password);
        
        const user = new User({
            email,
            password
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

    public signinUser(req: Request, res: Response) {
        const email: String = req.body.email;
        const password: String = req.body.password;

        // console.log(this.secret);

        User.findOne({ email, password })
        .then((data) => {
            console.log('Inside data: ' + data.toJSON().email);
            // console.log(this.secret);
            const status = res.statusCode;
            
            const token = jwt.sign({
                email: data.toJSON().email
            }, 'secret7', {
                expiresIn: '24h'
            });

            // console.log(token);
            res.json({
                status,
                token
            });
        })
        .catch((error) => {
            console.log('Inside Error');

            const status = res.statusCode;
            res.json({
                status,
                error
            });
        });
    }

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

    public routes() {
        // this.router.get('/', this.getUsers);
        // this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.post('/authenticate', this.signinUser);
        // this.router.put('/:username', this.updateUser);
        // this.router.delete('/:username', this.deleteUser);
    }
}

// Export
const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;
