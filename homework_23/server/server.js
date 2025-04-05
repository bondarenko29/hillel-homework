const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todos');

const app = express();
const port = 3001; 

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
