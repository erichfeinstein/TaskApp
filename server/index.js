const path = require('path');
const express = require('express');
const volleyball = require('volleyball');

const Task = require('./db/index').Task;

const app = express();
app.use(volleyball);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', function(req, res, next) {
  res.sendfile(path.join(__dirname, '..', '/client/index.html'));
});

app.get('/api', async function(req, res, next) {
  const tasks = await Task.findAll();
  res.json(tasks);
});

module.exports = app;
