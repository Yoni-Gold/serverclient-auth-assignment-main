import express , { Request , Response , NextFunction } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import User from './Schemas/User'

import dotenv from 'dotenv'
dotenv.config({path: './.env'});

const app = express();

app.use(cors());
app.use(express.json());

/// necessary functions ///

const mongoConnect = async (_req : Request , _res : Response , next : NextFunction) => {
    await mongoose.connect(`mongodb+srv://yoni:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.uv5un.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`);
    next();
}

// const errorHandle = (error : Error , _req : Request , res : Response , next : NextFunction) => {

// };

const unknownEndpoint = (_req : Request, res : Response) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

//////////////////////////

app.get('/' , (req : Request, res : Response) => {
    res.send('i got it' + req.body.signal);
})

app.post('/user' , mongoConnect , async (req : Request, res : Response) => {
    const user = new User({ ...req.body });
    await user.save();
    await mongoose.connection.close();
    res.send('saved');
})

app.use(unknownEndpoint);

console.log("Listening to port: " + (process.env.PORT || 3001));
app.listen(process.env.PORT || 3001);
