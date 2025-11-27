import { serve } from "@hono/node-server"
import { app } from "./index.js"

serve({
  fetch: app.fetch,
  port: 3000,
  hostname: "0.0.0.0"
}, (info) => {
  console.log(`App is running in dev mode at http://${info.address}:${info.port}`)
})