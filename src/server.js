import express from 'express'; 
import bodyParser from 'body-parser';
//import path from 'path';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.static(path.join(__dirname, '/public')));

const port = process.env.PORT||3000;

const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

export default server;