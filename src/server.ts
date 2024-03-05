import Express from 'express';

const app = Express();
const port = 3000;

app.use(Express.json());

app.get('/', (req, res) => {
    return res.send({
        message: "Hello world"
    });
});

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})

