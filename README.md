# r1ec-edge-hono

A minimal example showing how to deploy a [Hono](https://hono.dev) web app on [ArvanCloud Edge Computing](https://docs.arvancloud.ir/en/edge-computing).

This project demonstrates how to build and bundle a Hono app and run it in Arvan's edge function environment using the `r1ec` CLI.

---

## 🌐 Features

* ✅ Lightweight API using Hono (a super-fast edge framework)
* 🚀 Deployable on ArvanCloud Edge Compute
* 🔁 Portable to other edge platforms like Cloudflare Workers, Deno Deploy, Bun, etc.

---

## 🛠 Setup

### 1. Clone and install dependencies

```bash
git clone https://github.com/amirparsadd/r1ec-edge-hono.git
cd r1ec-edge-hono
npm install
```

### 2. Develop the API

The main logic lives in `src/index.ts`:

```ts
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

```

### 3. Build for deployment

```bash
npm run build
```

This will generate a bundled `dist/index.js` using `esbuild`, ready for edge deployment.

### 4. Deploy with ArvanCloud CLI

First, install and login to the CLI:

```bash
npm install -g r1ec
r1ec login -m YOUR_MACHINE_KEY
```

Then deploy:

```bash
r1ec deploy test -f dist/index.js
```

You'll receive a public edge URL in the panel.

---

## 🧪 Example API Call

```bash
curl https://test.amirparsab9.arvanedge.ir/
```

Response:

```json
{ "message":"Hello World" }
```

---

## 📁 Project Structure

```
r1c-edge-hono
├── src/
│   └── index.ts       # Hono app source code
├── dist/
│   └── index.js      # Bundled deployable output
├── package.json
├── README.md
└── LICENSE.md
```

---

## 🧠 How It Works

ArvanCloud Edge expects a JavaScript file that exports a `fetch(request)` handler. Hono supports this natively:

```ts
// Make it compatible with R1EC
export default {
  async fetch(request: Request) {
    return app.fetch(request)
  }
}
```

This wrapper allows Arvan to treat the Hono app as an Edge Function.

---

## 📚 References

* [Hono Docs](https://hono.dev)
* [ArvanCloud Edge Docs](https://docs.arvancloud.ir/en/edge-computing)
* [r1ec CLI Guide](https://docs.arvancloud.ir/en/edge-computing/cli)

---

## 📄 License
MIT
