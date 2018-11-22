import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
  }

  render() {
    return (
      <div>
        <h1>Tasks</h1>
        <ul>
          {this.state.tasks.map(function(task) {
            return <li key={task.id}>{task.taskContent}</li>;
          })}
        </ul>
      </div>
    );
  }

  async componentDidMount() {
    const tasks = await axios('/api');
    this.setState({
      tasks,
    });
  }
}
