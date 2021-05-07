const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const views = require('koa-views');
const serve = require('koa-static');
const nunjucks = require('nunjucks');
// const Joi = require('joi');
// const Redis = require('ioredis');
const cors = require('@koa/cors');

// const globalRouter = require('./src/router');
const userRouter = require('./src/users/users.router.js');
const passport = require('./src/libs/passport/koaPassport');
const errorCatcher = require('./src/middleware/errorCatcher');

passport.initialize();

const app = new Koa();
app.use(cors());

// const redis = new Redis('redis-17506.c263.us-east-1-2.ec2.cloud.redislabs.com');
// const redis = new Redis('redis://localhost:6379');
// console.log(redis.get('fname'));
// app.context.redis = redis;

app.use(bodyParser());
app.use(errorCatcher);

// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     if (err.isJoi) {
//       ctx.throw(400, err.details[0].message);
//     }
//     if (err.isPassport) {
//       ctx.throw(400, err.message);
//     }
//     console.log(err);
//     // ctx.throw(400, 'Something wrong');
//     ctx.throw(err.status || 500, err.message);
//   }
// });

const router = new Router();
const PORT = process.env.PORT || 3000;

const nunjucksEnvironment = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(path.join(__dirname, '/src/templates'))
);

const render = views(path.join(__dirname, '/src/templates'), {
  extention: 'html',
  options: {
    nunjucksEnv: nunjucksEnvironment,
  },
  map: {
    html: 'nunjucks',
  },
});

app.use(render);
app.use(serve(path.join(__dirname, './src/public')));

// router.use('/', globalRouter.router.routes());
router.use('/', userRouter.router.routes());

// app.use(router.routes());
app.use(router.middleware());

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
