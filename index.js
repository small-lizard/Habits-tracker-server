const express = require('express');
const cors = require('cors');
const HabitsController = require('./controllers/HabitsController');

const habitsController = new HabitsController();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.get('/habits-data', habitsController.getAll);

app.post('/habits-data', habitsController.addHabit);

app.put('/habits-data', habitsController.editHabit)

app.delete('/habits-data/:id', habitsController.deleteHabit)

app.use((req, res) => {
  res.status(404).send({message: 'Route not found'});
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(5000, 'localhost', () => {
    console.log('Server is started');
});