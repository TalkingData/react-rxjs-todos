import React, { Component} from 'react';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import withLoop from '../with-rxloop';

class Todos extends Component {
  
  state = {
    todos: []
  }

  componentDidMount() {
    const { source } = this.props;
    source.subscribe(data => {
      this.setState({ todos: data.todos });
    });
  }

  getVisibleTodos() {
    const { filter } = this.props.match.params;
    const { todos } = this.state;

    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  handleAdd(title) {
    const { service } = this.props;
    service.add(title);
  }

  handleRemove(uuid) {
    const { service } = this.props;
    service.remove(uuid);
  }

  handleRemoveCompleted() {
    const { service } = this.props;
    service.removeCompleted();
  }

  handleToggle(uuid) {
    const { service } = this.props;
    service.toggle(uuid);
  }

  handleToggleAll(event) {
    const { service } = this.props;
    service.toggleAll(event.target.checked);
  }

  handleUpdate(uuid, newTitle) {
    const { service } = this.props;
    service.update(uuid, newTitle);
  }

  render() {
    const { todos } = this.state;
    let todoList, todoFooter;

    if (todos.length) {
      const remainingCount = todos.filter(todo => !todo.completed).length;
      const hasCompleted = todos.length > remainingCount;

      todoList = (
        <TodoList
          todos={this.getVisibleTodos()}
          onRemoveClick={this.handleRemove.bind(this)}
          onToggleClick={this.handleToggle.bind(this)}
          onToggleAllClick={this.handleToggleAll.bind(this)}
          onUpdate={this.handleUpdate.bind(this)}
        >
        </TodoList>
      );
      todoFooter = (
        <TodoFooter
          remainingCount={remainingCount}
          hasCompleted={hasCompleted}
          onClearCompletedClick={this.handleRemoveCompleted.bind(this)}
        >
        </TodoFooter>
      );
    }

    return (
      <section className="todoapp">
        <TodoHeader onKeyDown={this.handleAdd.bind(this)}></TodoHeader>
        {todoList}
        {todoFooter}
      </section>
    )
  }
}

export default withLoop(Todos);