import * as crypto from 'crypto';

import Manager from '../models/Manager';

const genHash = (str) => {
    return crypto.createHash('sha256').update(str, 'utf8').digest('hex');
}

const login = (req, res, next) => {
    const serverNoise = crypto.randomBytes(6).toString('hex');
    req.session.serverNoise = serverNoise;
    const message = {serverNoise}
    return res.send({message});
}

const auth = async (req, res, next) => {
    const {clientNoise, code, username} = req.body;

    const manager = await Manager.findOne({username});

    if ( !manager ) {
        return res.status(404).send({message:"incorrect username"});
    } else {
        const hashPasswd = manager.password;
        const serverNoise = req.session.serverNoise;
    
        const realCode = `${hashPasswd}.${serverNoise}.${clientNoise}`;
        const hashRealCode = genHash(realCode);
    
        if ( code === hashRealCode ) {
            req.session.manager = manager;
            return res.status(200).send({message:"success"});
        } else {
            return res.status(401).send({message:"incorrect password"});
        }
    }

}

const hash = (req, res, next) => {
    const {str} = req.body;
    const hash = genHash(str);
    res.send(hash);
}

const gen = (req, res, next) => {
    const { serverNoise } = req.body;

    const pass = process.env.TEST_PASSWD;
    const hashPass = genHash(pass);

    const clientNoise = crypto.randomBytes(6).toString('hex');

    const code = `${hashPass}.${serverNoise}.${clientNoise}`;

    const hashCode = genHash(code);

    const message = {
        code: hashCode,
        clientNoise: clientNoise
    }
    
    return res.send(message);
}

export default {login, auth, gen, hash};