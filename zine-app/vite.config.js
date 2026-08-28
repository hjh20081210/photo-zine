import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 本地有证书才启用 https（仅 vite dev 用，Vercel 不需要）
const https = (() => {
  try {
    return {
      key: fs.readFileSync(path.resolve(__dirname, 'cert/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert/cert.pem')),
    }
  } catch (e) {
    return undefined
  }
})()

export default defineConfig({
  plugins: [ uni() ],
  server: {
    host: '0.0.0.0',
    ...(https ? { https } : {}),
  },
})