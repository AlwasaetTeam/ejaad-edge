import { Application, Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';


const router = new Router()
router
  .get('/oak', (context) => {
    context.response.body = 'This is an example Oak server running on Edge Functions!'
  })
  .post('/oak/greet', async (context) => {
    try {
      const result = context.request.body({ type: 'json', limit: 0 })
      const body = await result.value
      const name = body?.name || 'you'

      context.response.body = { msg: `Hey ${name}!` }
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      context.response.status = 400
      context.response.body = { error: "Invalid JSON body" }
    }
  })
  .get('/oak/redirect', (context) => {
    context.response.redirect('https://www.example.com')
  })

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 })
