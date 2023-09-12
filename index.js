// Imports database config
require('./src/config/database.config')

const express = require('express');
const appVersion1 = require('./src/config/versions/v1')
const envConfig = require('./src/config/env/index')
const { notFound, appErrorHandler, genericErrorHandler } = require('./src/middlewares/error.middleware');

const app = express();

app.use(express.json())

const PORT = envConfig.APP_PORT || 8080;

app.listen(PORT, () => {
    console.log(`Applicaion running on port ${PORT}`)
})


app.use('/api/v1', appVersion1);
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound)

module.exports = app;