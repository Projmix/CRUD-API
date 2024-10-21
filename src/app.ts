import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { handleNotFound, handleError } from './utils/errorHandlers';

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api/users', userRoutes);

app.use(handleNotFound);
app.use(handleError);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;