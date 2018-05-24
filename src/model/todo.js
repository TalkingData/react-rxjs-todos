import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { remove, find } from 'lodash-es';
import { getListApi, createApi, removeApi, removeCompletedApi, toggleApi } from '../api';

export default {
  name: 'todos',
  state: {
    todos: [],
  },
  reducers: {
    list(state, action) {
      return {
        ...state,
        todos: [ ...state.todos, ...action.todos ],
      };
    },
    create(state, action) {
      const todos = [ ...state.todos ];
      todos.push(action.todo);
      return {
        ...state,
        todos,
      };
    },
    modify(state, action) {
      const todos = [ ...state.todos ];
      const todo = find(todos, todo => todo.id === action.uuid);
      todo.title = action.title;

      return {
        ...state,
        todos,
      };
    },
    remove(state, action) {
      const todos = [...state.todos];
      remove(todos, item => item.id === action.uuid);

      return {
        ...state,
        todos,
      };
    },
    removeCompleted(state, action) {
      const todos = [...state.todos];
      remove(todos, item => item.completed);

      return {
        ...state,
        todos,
      };
    },
    toggle(state, action) {
      const todos = [ ...state.todos ];
      const todo = find(todos, todo => todo.id === action.uuid);
      todo.completed = !todo.completed;

      return {
        ...state,
        todos,
      };
    },
    toggleAll(state, action) {
      const todos = [ ...state.todos ];
      todos.forEach(todo => todo.completed = action.completed);

      return {
        ...state,
        todos,
      };
    },
  },
  epics: {
    getList(action$) {
      return action$.pipe(
        switchMap(() => {
          return from(
            getListApi().catch(error => {
              return { error };
            }),
          );
        }),
        map(data => {
          return {
            type: 'list',
            todos: data,    
          };
        }),
      );
    },
    createTodo(action$) {
      return action$.pipe(
        switchMap((data) => {
          return from(
            createApi(data.payload)
          );
        }),
        map(data => {
          return {
            type: 'create',
            todo: data,
          };
        }),
      );
    },
    modifyTodo(action$) {
      return action$.pipe(
        map(data => {
          return {
            type: 'modify',
            uuid: data.payload,
          };
        }),
      );
    },
    removeTodo(action$) {
      return action$.pipe(
        switchMap((data) => {
          return from(
            removeApi(data.uuid),
          );
        }),
        map(data => {
          console.log(data);
          return {
            type: 'remove',
            uuid: data.uuid,
          };
        }),
      );
    },
    removeCompletedTodos(action$) {
      return action$.pipe(
        switchMap((action) => {
          return from(
            removeCompletedApi(),
          );
        }),
        map(data => {
          return {
            type: 'removeCompleted',
          };
        }),
      );
    },
    toggleTodo(action$) {
      return action$.pipe(
        switchMap(({ uuid }) => {
          return from(
            toggleApi(uuid)
          );
        }),
        map(({ uuid }) => {
          return {
            type: 'toggle',
            uuid,
          }
        }),
      );
    },
    toggleAllTodos(action$) {
      return action$;
    },
  },
};
