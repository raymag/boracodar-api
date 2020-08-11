// import Manager from "./models/Manager";

const router = require('express').Router();

import Manager from './controllers/Manager';
import Post from './controllers/Post';

const authedRoute = async (req, res, next) => {
    if (!req.session.manager) {
        return res.status(401).send();
    }
    return next();
}

router.get('/', (req, res) => {
    res.send('H3ll0 W0RlD');
});

router.post('/gen', Manager.gen);

router.post('/auth', Manager.auth);

router.post('/login', Manager.login);

router.post('/hash', Manager.hash);


router.get('/post/:id', Post.get);

router.post('/post', authedRoute, Post.create);

router.put('/post/:id', authedRoute, Post.update);

export default router;