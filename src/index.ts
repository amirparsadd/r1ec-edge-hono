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

app.get('/html', (c) => {
  // This can also be achieved by importing an html file but it needs some rollup configs
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>R1EC-Edge-Hono</h1>
  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, amet esse suscipit nobis labore velit modi similique, unde quis enim expedita possimus vel id commodi. Necessitatibus odio quam deleniti sapiente.</p>
</body>
</html>
    `)
})

// Make it compatible with R1Cloud Edge
export default {
  async fetch(request: Request) {
    return app.fetch(request)
  }
}
