
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'travellingapp-production.up.railway.app',
      'portal.travelokart.com'
    ]
  }
})
