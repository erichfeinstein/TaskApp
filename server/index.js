const path = require('path');
const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');

const Task = require('./db/index').Task;

const app = express();
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', '/client/index.html'));
});

app.get('/api', async function(req, res, next) {
  try {
    const tasks = await Task.findAll({
      order: [['id', 'ASC']],
    });
    res.json(tasks);
  } catch (err) {
    console.error(err);
  }
});

app.post('/', async function(req, res) {
  try {
    const content = req.body;
    const createdTask = await Task.create(content);
    res.json(createdTask);
  } catch (err) {
    console.error(err);
  }
});

app.put('/:id', async function(req, res) {
  try {
    const content = req.body;
    const taskToUpdate = await Task.findOne({
      where: {
        id: req.params.id,
      },
    });
    const updatedTask = await taskToUpdate.update(content);
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
  }
});

app.delete('/:id', async function(req, res) {
  try {
    const content = req.body;
    const taskToRemove = await Task.findOne({
      where: {
        id: req.params.id,
      },
    });
    const removedTask = await taskToRemove.destroy();
    res.json(removedTask);
  } catch (err) {
    console.error(err);
  }
});

module.exports = app;
