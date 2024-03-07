import Express from 'express';
import route from './routes/UserRoute';


const app = Express();
const port = 3000;

app.use(Express.json());
app.use(route)


app.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})

