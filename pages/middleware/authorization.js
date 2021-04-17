import cookies from 'next-cookies'

export function unauthPage(ctx){
  return new Promise((resolve , reject) => {
    const allCookie = cookies(ctx)
    if(allCookie.token){
        // 302 redirect
        return ctx.res.writeHead(302, {
            location:'/posts'
        }).end();
    }
    resolve('unauthorization');
    
  })
}