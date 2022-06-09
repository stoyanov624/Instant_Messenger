import * as express from 'express';
import { UserController } from '../controllers/UserController';

class MainRouter {
    router: express.Router;
    userController: UserController;

    constructor() {
        this.router = express.Router();
        this.userController = new UserController();

        this.setRoutes();
    }

    private setRoutes() {
        this.router.use('/users', this.userController.router)
    }
}

export {MainRouter}