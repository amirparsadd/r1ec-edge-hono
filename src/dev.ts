import "dotenv/config"

import { serve } from "@hono/node-server"
import { app } from "./index.js"

serve({
  fetch: app.fetch,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  hostname: process.env.HOSTNAME ? process.env.HOSTNAME : "0.0.0.0"
}, (info) => {
  console.log(`App is running in dev mode at http://${info.address}:${info.port}`)
})