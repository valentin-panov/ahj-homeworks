const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const Router = require('koa-router');
const fakeData = require('./fakeData');

const serverEngine = new Koa();
const router = new Router();

serverEngine.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'OPTIONS'],
  })
);
serverEngine.use(koaBody({ urlencoded: true, multipart: true }));

const messages = [
  {
    id: '01',
    from: 'anya@ivanova',
    subject: 'Hello from Anya',
    body: 'Long message body here',
    received: 1623181744408,
  },
  {
    id: '02',
    from: 'alex@petrov',
    subject: 'Hello from Alex Petrov!',
    body: 'Long message body here',
    received: 1623181744408,
  },
];

const intervalId = setInterval(() => {
  const msgLimit = 2;
  let msgCount = Math.floor(Math.random() * msgLimit);
  while (msgCount > 0) {
    messages.push(fakeData());
    msgCount--;
  }
}, 5000);

router.get('/messages/unread', async (ctx) => {
  ctx.response.body = {
    status: 'ok',
    messages: messages,
  };
});

router.get('/messages/clear', async (ctx) => {
  messages.length = 0;
  ctx.response.body = {
    status: 'ok',
    messages: messages,
  };
});

serverEngine.use(router.routes()).use(router.allowedMethods());

module.exports = serverEngine;
