const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const views = require('koa-views');
const serve = require('koa-static');
const nunjucks = require('nunjucks');
const globalRouter = require('./src/router');

const app = new Koa();
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

router.use('/', globalRouter.router.routes());

app.use(router.routes());

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
