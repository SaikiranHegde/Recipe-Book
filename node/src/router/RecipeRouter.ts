import { Router, Request, Response, NextFunction } from 'express';

import Recipe from '../models/Recipe';

class RecipeRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getRecipes(req: Request, res: Response) {
        Recipe.find({})
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
    }

    public storeRecipe(req: Request, res: Response) {
        const name: String = req.params.name;

        Recipe.findOneAndUpdate({ name }, req.body, { new: true, upsert: true})
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

    routes() {
        this.router.get('/', this.getRecipes);
        this.router.put('/:name', this.storeRecipe);
    }
}

const recipeRoutes = new RecipeRouter();
recipeRoutes.routes();

export default recipeRoutes.router;