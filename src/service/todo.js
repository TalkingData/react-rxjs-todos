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
      uuid,
    });
  }

  removeCompleted() {
    app.dispatch({
      type: 'todos/removeCompletedTodos',
    });
  }

  toggle(uuid) {
    app.dispatch({
      type: 'todos/toggleTodo',
      uuid,
    });
  }

  toggleAll(completed) {
    console.log(completed);
    app.dispatch({
      type: 'todos/toggleAll',
      payload: completed,
    });
  }

  update(uuid, title) {
    app.dispatch({
      type: 'todos/modifyTodo',
      payload: { uuid, title },
    });
  }
}

export default new TodoService();