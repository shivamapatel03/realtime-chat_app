import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
// add the below code
  server: {
    port: 5000 // change here
  },
})