// server.ts
import Express from 'express';
import userRouter from './routes/UserRoute';
import movieRouter from './routes/MovieRoute';

const app = Express();
const port = 3000;

app.use(Express.json());
app.use(userRouter);
app.use(movieRouter)

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});
