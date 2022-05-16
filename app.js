const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const limiter = require('./src/middlewares/limiter');

const authRouter = require('./src/routes/api/auth');
const categoriesRouter = require('./src/routes/api/categories');
const transactionsRouter = require('./src/routes/api/transactions');
const usersRouter = require('./src/routes/api/users');

const {
  routesErrorhandler,
  mainErrorHandler,
} = require('./src/service/errorHandlers');
const { apiLimit } = require('./src/config/rateLimit.json');
const { swaggerUI, swaggerSpec } = require('./src/helpers/swagger');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(cors());
app.use(limiter(apiLimit));
app.use(helmet());
app.use(logger(formatsLogger));
app.use(express.json());
app.use(express.static(process.env.STATIC_FOLDER));

// TEST: GoogleAuth
app.use('/link', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/link.html'));
});
app.use('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});
// TEST: GoogleAuth

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api/auth', authRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/users', usersRouter);

app.use(routesErrorhandler);
app.use(mainErrorHandler);

module.exports = app;
