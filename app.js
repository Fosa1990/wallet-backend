const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./src/middlewares/limiter');

const authRouter = require('./src/routes/api/auth');
const categoriesRouter = require('./src/routes/api/categories');
const transactionsRouter = require('./src/routes/api/transactions');
const usersRouter = require('./src/routes/api/users');

const { HTTP_CODE, STATUS, MESSAGE } = require('./src/helpers/constants');
const { apiLimit } = require('./src/config/rateLimit.json');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(limiter(apiLimit));
app.use(helmet());
app.use(logger(formatsLogger));
app.use(express.static(process.env.STATIC_FOLDER));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/users', usersRouter);

app.use((_, res) => {
  res.status(HTTP_CODE.NOT_FOUND).json({
    status: STATUS.ERROR,
    code: HTTP_CODE.NOT_FOUND,
    message: MESSAGE.TOOLTIP_ROUTES,
    payload: MESSAGE.NOT_FOUND,
  });
});

app.use((err, req, res, next) => {
  const { status, stack, message } = err;

  const statusCode = status || HTTP_CODE.INTERNAL_SERVER_ERROR;
  const statusText = status || STATUS.FAIL;
  const statusMessage = message || MESSAGE.INTERNAL_SERVER_ERROR;

  console.log('__MAIN_ERROR_HANDLER__: ', stack);

  res.status(statusCode).json({
    status: statusText,
    code: statusCode,
    message,
    payload: statusMessage,
  });
});

module.exports = app;
