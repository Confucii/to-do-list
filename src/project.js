export default function project(initName) {
  let name = initName;
  const todos = [];
  const getName = () => name;

  function setName(newName) {
    name = newName;
  }

  function addToDo(todo) {
    todos.push(todo);
  }

  function removeToDo(index) {
    todos.splice(index, 1);
  }

  return {
    getName,
    setName,
    addToDo,
    removeToDo,
  };
}
