
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'travellingapp-production.up.railway.app',
      'portal.travelokart.com'
    ]
  }
})
