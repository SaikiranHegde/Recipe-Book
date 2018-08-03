import { Router, Request, Response, NextFunction } from 'express';

import Recipe from '../models/Recipe';

class RecipeRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    getRecipes(req: Request, res: Response) {
        Recipe.find({})
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
    }

    storeRecipes(req: Request, res: Response) {
        console.log("Inside storeRecipes");
        
        let array = req.body;

        array.forEach(element => {
            const name: String = element.name;
            const description: String = element.description;
            const imagePath: String = element.imagePath;
            const ingredients = element.ingredients;

            const recipe = new Recipe({
                name,
                description,
                imagePath,
                ingredients
            });

            recipe.save()
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
        });        
    }

    routes() {
        this.router.get('/', this.getRecipes);
        this.router.post('/', this.storeRecipes);
    }
}

const recipeRoutes = new RecipeRouter();
recipeRoutes.routes();

export default recipeRoutes.router;