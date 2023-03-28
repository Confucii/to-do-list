export default function Project(initName) {
  let name = initName;
  const todos = [];
  const getName = () => name;
  const getToDos = () => todos;

  function setName(newName) {
    name = newName;
  }

  function addToDo(todo) {
    todos.push(todo);
  }

  function removeToDo(index) {
    todos.splice(index, 1);
  }

  function getToDo(index) {
    return todos[index];
  }

  return {
    getName,
    setName,
    addToDo,
    removeToDo,
    getToDos,
    getToDo,
  };
}
