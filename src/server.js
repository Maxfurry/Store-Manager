import express from 'express'; 
import bodyParser from 'body-parser';
//import path from 'path';

import usersRouter from './route/users';
import productsRouter from './route/products';
import salesRouter from './route/sales';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.static(path.join(__dirname, '/public')));


app.use('/api/v1/products', productsRouter); 
app.use('/api/v1/sales', salesRouter); 
app.use('/api/v1/auth', usersRouter)
app.use('/api/v1/user', usersRouter);    

app.get('/', (req, res) => {
res.status(200).send({
    
});
});

const port = process.env.PORT||3000;

const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

export default server;