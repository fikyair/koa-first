const fs = require('fs');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const app = new Koa();

const router = require('koa-router')();
let files = fs.readdirSync(__dirname + '/controllers');

app.use(bodyParser());

//过滤出s文件
let js_files = files.filter((f)=>{
    return f.endsWith('.js');
});

//处理每个js文件:
for (let f of js_files) {
    console.log(`process controller: ${f}...`);
    //导入js文件：
    let mapping = require(__dirname + '/controllers/' + f);
    console.log('router',router)
    for (let url in mapping) {
        if(url.startsWith("GET")){
            //如果url类似“GET XXX”：
            let path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if(url.startsWith('POST')) {
            //如果url类似“POST XXX”:
            let path = url.substring(5);
            router.post(post, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            //无效的url
            console.log(`invalid URL: ${url}`);
        }
    }
}




// const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');

// const router = require('koa-router')();
// const app = new Koa();

// app.use(bodyParser());
// // log request URL
// app.use(async (ctx, next) => {
//     console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
//     await next();
// })

// // Get 请求 add url-route
// router.get('/hello/:name', async (ctx, next) => {
//     var name = ctx.params.name;
//     ctx.response.body = `<h1>Hello, ${name}! </h1>`;
// })

// router.get('/', async (ctx, next) => {
//     ctx.response.body = '<h1>Index</h1>';
// })
// //add router middleware;
// app.use(router.routes());
// app.listen(3000);
// console.log('app started at port 3000...');

// // Post 请求 表单登录
// router.get('/form',async (ctx, next) => {
//      ctx.response.body =   `<h1>Index</h1>
//      <form action="/signin" method='post'>
//             <p>Name: <input name='name' value='koa'></p>
//             <p>Password:<input name='password' type='password'></p>
//             <p><input type = 'submit' value='submit'></p>
//      <form>`;
// });

// router.post('/signin',async (ctx, next) => {
//     var 
//     name = ctx.request.body.name || '',
//     password = ctx.request.body.password || '';
//     console.log(`signin with name: ${name}, password: ${password}`);
//     if (name ==='koa' && password === '123456') {
//         ctx.response.body = `<h1>Welcome,${name}!</h1>`;
//     } else {
//         ctx.response.body = `<h1>Login failed!</h1>
//         <p><a href='/'> Try again</a> </p>`;
//     }
// })

//-------
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