import * as  express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cors from 'cors';

// import routers
import PostRouter from './router/PostRouter';
import UserRouter from './router/UserRouter';
import RecipeRouter from './router/RecipeRouter';

// Server Class
class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config() {
        console.log('Inside config');

        const MONGO_URI = 'mongodb://localhost/recipe_book';
        mongoose.connect(MONGO_URI || process.env.MONGO_URI);

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    public routes() {
        console.log('Inside Routes');

        this.app.use('/api/recipes', RecipeRouter);
        // this.app.use('/api/posts', PostRouter);
        this.app.use('/api/users', UserRouter);
    }
}

export default new Server().app;
