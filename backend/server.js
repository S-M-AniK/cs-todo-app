const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const todosRouter = require('./routes/todos');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/todos', todosRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});