import 'dotenv/config'
import { defineConfig } from 'orval'

const SWAGGER_URL = process.env.VITE_SWAGGER_URL ?? 'http://localhost:3000/swagger/json'

export default defineConfig({
  defaultClient: {
    input: {
      target: SWAGGER_URL,
    },
    output: {
      mode: 'single',
      target: 'src/shared/api/client.ts',
      client: 'axios',
      httpClient: 'axios',
      override: {
        mutator: {
          path: './src/shared/api/apiMutator.ts',
          name: 'apiMutator',
        },
      },
    },
  },
})
