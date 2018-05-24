import { remove, find } from 'lodash-es';

const db = {
  save(todos) {
    localStorage.setItem('rxloop-react-todos', JSON.stringify(todos))
  },
  findAll() {
    return JSON.parse(localStorage.getItem('rxloop-react-todos')) || [];
  }
};


export const getListApi = async () => {
  return db.findAll();
};

export const createApi = async (todo) => {
  const list = db.findAll();
  list.push(todo);
  db.save(list);
  return todo;
};

export const removeApi = async (uuid) => {
  const list = db.findAll();
  remove(list, (todo) => todo.id === uuid);
  db.save(list);
  return { uuid };
};