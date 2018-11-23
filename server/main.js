const PORT = 8080;
const server = require('./index');
const dbModels = require('./db');
const db = dbModels.db;
const Task = dbModels.Task;

db.sync().then(() => {
  server.listen(PORT, () =>
    console.log(`

        Listening on port ${PORT}

        http://localhost:${PORT}/

    `)
  );
});

//dummy
async function createDummy() {
  try {
    await Task.create({
      taskContent: 'finish my practice project!',
    });
  } catch (err) {
    console.error(err);
  }
}
// createDummy();
