import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { cors } from 'hono/cors'

export const app = new Hono()

app.use(cors())

app.get('/', (c) => c.json({ message: 'Hello World' }))

app.get(
  '/secret',
  basicAuth({
    username: 'admin',
    password: 'admin',
  }),
  (c) => {
    return c.text('This is a secret!')
  }
)

// Make it compatible with R1Cloud Edge
export default {
  async fetch(request: Request) {
    return app.fetch(request)
  }
}
