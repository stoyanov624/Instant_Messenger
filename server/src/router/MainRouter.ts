import * as express from 'express';
import { GroupController } from '../controllers/GroupController';
import { UserController } from '../controllers/UserController';

class MainRouter {
    router: express.Router;
    userController: UserController;
    groupController: GroupController;

    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.groupController = new GroupController();

        this.setRoutes();
    }

    private setRoutes() {
        this.router.use('/users', this.userController.router);
        this.router.use('/groups', this.groupController.router);
    }
}

export {MainRouter}