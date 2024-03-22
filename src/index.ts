// server.ts
import Express from 'express';
import userRouter from './routes/UserRoute';
import movieRouter from './routes/MovieRoute';
import firebase from './config/firebase.config';
import {getFirestore} from 'firebase/firestore'


const app = Express();
const port = 3000;
const fireStore = getFirestore(firebase)

app.use(Express.json());
app.use(userRouter);
app.use(movieRouter);

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});
