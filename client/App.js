import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
    this.completeTask = this.completeTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.createNewTask = this.createNewTask.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Tasks</h1>
        <ul>
          {this.state.tasks.map(task => {
            return (
              <li
                key={task.id}
                onClick={async evt => {
                  if (!task.complete) await this.completeTask(evt, task.id);
                  else await this.removeTask(evt, task.id);
                }}
              >
                {task.taskContent}
              </li>
            );
          })}
          <div id="new-task-field">
            <input id="new-task-info" placeholder={'Enter new task!'} />
            <button id="confirm-button">Confirm</button>
          </div>
        </ul>
      </div>
    );
  }

  completeTask = async (evt, idToComplete) => {
    const result = await axios.put(`/${idToComplete}`, { complete: true });
    const newTaskList = (await axios.get('/api')).data;
    this.setState({
      tasks: newTaskList,
    });
  };

  removeTask = async (evt, idToRemove) => {
    const result = await axios.delete(`/${idToRemove}`);
    const newTaskList = (await axios.get('/api')).data;
    this.setState({
      tasks: newTaskList,
    });
  };

  async createNewTask(content) {
    // console.log({ taskContent: content });
    try {
      const result = await axios.post('/', { taskContent: content });
      let prevTaskList = this.state.tasks;
      prevTaskList.push(result.data);
      this.setState({
        tasks: prevTaskList,
      });
    } catch (err) {
      console.error(err);
    }
  }
  async componentDidMount() {
    const tasks = (await axios.get('/api')).data;
    this.setState({
      tasks,
    });

    const button = document.getElementById('confirm-button');
    button.addEventListener('click', () => {
      this.createNewTask(document.getElementById('new-task-info').value);
      //Revert input field value
      document.getElementById('new-task-info').value = '';
    });
  }
}
