import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import axios from 'axios';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  server: {
    port: 3001, // Adjust the port as needed
    proxy: {
      '/media': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});

// Custom Koa middleware to handle media route
import Koa from 'koa';
import { createServer } from 'http';


const app = new Koa();
const server = createServer(app.callback());

app.use(async (ctx, next) => {
  if (ctx.path.startsWith('/media')) {
    
    
    console.log("Invocked")
    const imageUrl = `http://127.0.0.1:8000${ctx.url}`;
    try {
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer', // Set the response type to arraybuffer for binary data
      });

      // Set the appropriate content type based on the image type (e.g., jpeg, png)
      ctx.set('Content-Type', imageResponse.headers['content-type']);
      
      // Forward the image data to the client
      ctx.body = imageResponse.data;
    } catch (error) {
      console.error('Error fetching image:', error);
      ctx.status = 500;
      ctx.body = 'Internal Server Error';
    }
  } else {
    await next();
  }
});

server.listen(3000);
