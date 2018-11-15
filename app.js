const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const index = require('./src/routes/index');
const messageRoute = require('./src/routes/messageRoute');
const authRoute = require('./src/routes/authRoute');
const ufRoute = require('./src/routes/ufRoute');
const cors = require('cors');

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.use('/', index);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/message', messageRoute);
app.use('/auth', authRoute);
app.use('/uf', ufRoute);
app.use(cors());

module.exports = app;
