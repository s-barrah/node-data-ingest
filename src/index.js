import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import DBService from './services/DB.service';

// import data
import models from './models';

// import modular routes
import routes from './routes';

// initialise the express app
const app = express();

// initialise DB service
const dbService = new DBService();

// enable cors
app.use(cors());

// enable body parser to parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable routes
app.use('/contracts', routes.ContractsRoute);
app.use('/tracks', routes.TracksRoute);

// Connect to mongodb
dbService.connect();

// Home route
app.get('/', (req, res) => {
  console.log('req.params: ', req.params);
  console.log('req.query: ', req.query);
  res.send('Received a GET HTTP method');
});


app.listen(process.env.PORT, () =>
  console.log(`Test app listening on port ${process.env.PORT}!`),
);

