import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
//  import path from 'path';

import usersRouter from './route/users';
import productsRouter from './route/products';
import salesRouter from './route/sales';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//  app.use(express.static(path.join(__dirname, '/public')));


app
  .use(cors())
  .use('/api/v1/products', productsRouter)
  .use('/api/v1/sales', salesRouter)
  .use('/api/v1/auth', usersRouter)
  .get('/', (req, res) => {
    res.status(200).send('Store Manager is a web application that helps store owners manage sales and product inventory records. This application is meant for use in a single store.');
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  process.stdout.write(`listening on port ${port}\n`);
});

export default server;
