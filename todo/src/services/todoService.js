import { db } from "../firebase";
import { 
  ref, 
  push, 
  onValue, 
  update, 
  remove 
} from "firebase/database";

const todosRef = ref(db, 'todos');

export const addTodo = (todo) => {
  return push(todosRef, {
    text: todo.text,
    completed: false,
    createdAt: new Date().toISOString()
  });
};

export const getTodos = (callback) => {
  return onValue(todosRef, (snapshot) => {
    const todos = [];
    snapshot.forEach((childSnapshot) => {
      todos.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    callback(todos);
  });
};

export const updateTodo = (id, updates) => {
  const todoRef = ref(db, `todos/${id}`);
  return update(todoRef, updates);
};

export const deleteTodo = (id) => {
  const todoRef = ref(db, `todos/${id}`);
  return remove(todoRef);
};