import * as express from 'express';

export class GroupController {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.createRoutes();
    }

    private createRoutes() {
        this.router.get('/messages/:groupId');
        this.router.post('/messages/:groupId');
        this.router.post('/:userId');
    }
}