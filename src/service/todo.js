import rxLoop from 'rxloop';
import todoModel from '../model/todo';
import Todo from '../entity/todoModel';

const app = rxLoop();
app.model(todoModel);

class TodoService {

  constructor() {
    this.todos$ = app.stream('todos');
    
    app.dispatch({
      type: 'todos/getList',
    });
  }

  add(title) {
    app.dispatch({
      type: 'todos/createTodo',
      payload: new Todo(title),
    });
  }

  remove(uuid) {
    app.dispatch({
      type: 'todos/removeTodo',
      payload: uuid,
    });
  }

  removeCompleted() {
    app.dispatch({
      type: 'todos/removeCompletedTodos',
    });
  }

  toggle(uuid) {
    app.dispatch({
      type: 'todos/toggle',
      uuid,
    });
  }

  toggleAll(completed) {
    app.dispatch({
      type: 'todos/toggleAll',
      payload: completed,
    });
  }

  update(uuid, newTitle) {
    app.dispatch({
      type: 'todos/modifyTodo',
      payload: { uuid, newTitle },
    });
  }
}

export default new TodoService();