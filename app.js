const Koa = require('koa');
const boayParser = require('koa-bodyparser');

const router = require('koa-router')();
const app = new Koa();

app.use(bodyParser());
// log request URL
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next();
})

//add url-route
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}! </h1>`;
})

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
})
//add router middleware;
app.use(router.routes());
app.listen(3000);
console.log('app started at port 3000...');

// Post 请求


// app.use(async (ctx,next) => {
//     await next();
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>Hello,koa2!</h1>'
// });

// app.listen(3000);
// console.log('app started at port 3000...');
// app.use(async (ctx, next) =>{
//     console.log(`${ctx.request.method} ${ctx.request.url}`);
//     await next();
// });

// app.use(async (ctx, next) => {
//     const start = new Date().getTime();
//     await next();
//     const ms = new Date().getTime() - start;
//     console.log(`Time: ${ms} ms`);
// })

// app.use(async (ctx, next) => {
//     if(ctx.request.path === '/'){
//         ctx.response.body = 'index page';
//     } else {
//         await next();
//     }
// })

// app.use(async (ctx, next) => {
//     if (ctx.request.path === '/test') {
//         ctx.response.body = 'TEST page';
//     } else {
//         await next();
//     }
// });