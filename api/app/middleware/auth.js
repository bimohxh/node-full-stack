// 身份认证

module.exports = options => {
  return async function auth (ctx, next) {
    // ..
    console.log('过了中间件auth')
    await next()
  }
}
