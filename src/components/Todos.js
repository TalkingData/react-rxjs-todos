import React, { Component} from 'react';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import Todo from '../entity/todoModel';

class Todos extends Component {
  
  state = {
    todos: []
  }

  componentDidMount() {
    const { streams, dispatch } = this.props;
    streams.todos$.subscribe(data => {
      this.setState({ todos: data.todos });
    });
    dispatch({
      type: 'todos/getList',
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
    const { dispatch } = this.props;
    dispatch({
      type: 'todos/createTodo',
      payload: new Todo(title),
    });
  }

  handleRemove(uuid) {
    const { dispatch } = this.props;
    dispatch({
      type: 'todos/removeTodo',
      uuid,
    });
  }

  handleRemoveCompleted() {
    const { dispatch } = this.props;
    dispatch({
      type: 'todos/removeCompletedTodos',
    });
  }

  handleToggle(uuid) {
    const { dispatch } = this.props;
    dispatch({
      type: 'todos/toggleTodo',
      uuid,
    });
  }

  handleToggleAll(event) {
    const { dispatch } = this.props;
    dispatch({
      type: 'todos/toggleAll',
      payload: event.target.checked,
    });
  }

  handleUpdate(uuid, title) {
    const { dispatch } = this.props;
    dispatch({
      type: 'todos/modifyTodo',
      payload: { uuid, title },
    });
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

export default Todos;