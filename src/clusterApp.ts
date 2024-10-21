import cluster from 'cluster';
import http from 'http';
import os from 'os';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const numCPUs = os.cpus().length; 
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000; 

if (cluster.isMaster) {
  console.log(`Master process is running. Setting up ${numCPUs - 1} workers.`);

  for (let i = 1; i < numCPUs; i++) {
    cluster.fork({ WORKER_PORT: PORT + i });
  }

  let currentWorker = 1;

  const server = http.createServer((req, res) => {
    const targetPort = PORT + currentWorker;
    const proxy = createProxyMiddleware({
      target: `http://localhost:${targetPort}`,
      changeOrigin: true,
    });

    proxy(req, res, (err) => {
      if (err) console.error(err);
    });

    currentWorker = currentWorker % (numCPUs - 1) + 1;
  });

  server.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`);
  });

} else {
  const app = express();
  const port = process.env.WORKER_PORT || 4001;
  
  app.use(express.json());

  const userRoutes = require('./routes/userRoutes').default;
  app.use('/api', userRoutes);

  app.listen(port, () => {
    console.log(`Worker listening on port ${port}`);
  });
}
