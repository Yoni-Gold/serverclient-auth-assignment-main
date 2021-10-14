import express , { Request , Response , NextFunction } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import User from './Schemas/User'
import cookieParser from 'cookie-parser'

import dotenv from 'dotenv'
dotenv.config({path: './.env'});

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

/// necessary functions ///

const mongoConnect = async (_req : Request , _res : Response , next : NextFunction) => {
    await mongoose.connect(`mongodb+srv://yoni:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.uv5un.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`);
    next();
}

// const errorHandle = (error : Error , _req : Request , res : Response , next : NextFunction) => {

// };

const authentication = async (req : Request , _res : Response , next : NextFunction) => {
    const token : string = req.cookies.token;
    req.body.user = await jwt.verify(token , process.env.SECRET);
    next();
};

const unknownEndpoint = (_req : Request, res : Response) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

//////////////////////////

app.get('/' , (req : Request, res : Response) => {
    res.send('i got it' + req.body.signal);
})

// create new user
app.post('/user' , mongoConnect , async (req : Request, res : Response) => {
    const user : Array<Object> = await User.find({ email: req.body.email });
    if (user[0]) 
    {
        res.send('this user\'s email already exists');
    }

    else
    {
        const newUser = new User({ ...req.body.user });
        await newUser.save();
        await mongoose.connection.close();
        res.send('saved');
    }
});

// update user
app.put('/user' , authentication , mongoConnect , async (req : Request, res : Response) => {
    await User.findOneAndUpdate({ email: req.body.user.email , password: req.body.user.password } , { ...req.body.newUser });
    await mongoose.connection.close();
    let newToken = await jwt.sign({ ...req.body.newUser } , process.env.SECRET , { expiresIn: 120000 });
    res.cookie('token', newToken, { httpOnly: true });
    res.send(newToken);
});

// login with email and password
app.post('/login' , mongoConnect , async (req : Request, res : Response) => {
    const user : Array<Object> = await User.find({ email: req.body.email , password: req.body.password });
    await mongoose.connection.close();
    if (user[0])
    {
        let token = await jwt.sign({ user: user[0] } , process.env.SECRET , { expiresIn: 120000 });
        res.cookie('token', token, { httpOnly: true });
        res.send(token);
    }

    else
    {
        res.status(401).send(false);
    }
});

// login with token
app.post('/token' , authentication , async (_req : Request, res : Response) => {
    res.send(true);
});

// logout deletes the web token
// app.get('/logout' , authentication, async (req : Request, res : Response) => {

// });

app.use(unknownEndpoint);

console.log("Listening to port: " + (process.env.PORT || 3001));
app.listen(process.env.PORT || 3001);
