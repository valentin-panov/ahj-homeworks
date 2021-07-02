const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const slow = require('koa-slow');
const Router = require('koa-router');
const fakeData = require('./fakeData');

const serverEngine = new Koa();
const router = new Router();

serverEngine
  .use(
    cors({
      origin: '*',
      allowMethods: ['GET', 'OPTIONS'],
    })
  )
  .use(koaBody({ urlencoded: true, multipart: true }))
  .use(
    slow({
      delay: 3000,
    })
  );

router.get('/news', async (ctx) => {
  const news = [fakeData(), fakeData(), fakeData()];
  ctx.response.body = {
    status: 'ok',
    news,
    timestamp: new Date(),
  };
});

serverEngine.use(router.routes()).use(router.allowedMethods());

module.exports = serverEngine;
