var landingPlugin = function (ctx) {
  var mark
  ctx.router.beforeEach(function (to, from, next) {
    if (to.meta && to.meta.name === 'landing' && !mark) {
      mark = true
      ctx.event.on('landing:updated', function () {
        var elem = document.getElementById('kinds')
        var opts = {
          typeSpeed: 50,
          deleteSpeed: 50,
          pauseDelay: 2000,
          loop: true,
          postfix: ''
        }
        malarkey(elem, opts)
          .type('Front-end apps').pause().delete()
          .type('Vue.js').pause().delete()
          .type('React et al').pause().delete()
          .type('Babel and PostCSS').pause().delete()
          .type('Any framework').pause().delete()
          .type('Humans').pause().delete()
          .type('Pros and Newbies').pause().delete()
          .type('Fun').pause().delete()  
      })
    }
    next()
  })
}