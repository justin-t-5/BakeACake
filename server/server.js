import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cakeRouter from './routes/cakes.js';

dotenv.config();

const PORT = process.env.PORT || 3002;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Mount your API router
app.use('/api', cakeRouter);

if (process.env.NODE_ENV === 'development') {
  app.use(favicon(path.resolve('../', 'client', 'public', 'logo.png')));

  // ✅ Add this fallback route
  app.get('/', (_, res) => {
    res.send('API is running...');
  });
} else if (process.env.NODE_ENV === 'production') {
  app.use(favicon(path.resolve('public', 'logo.png')));
  app.use(express.static('public'));
  app.get('/*', (_, res) =>
    res.sendFile(path.resolve('public', 'index.html'))
  );
}

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});