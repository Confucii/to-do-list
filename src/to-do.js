const ToDo = function ToDoFactory(
  initTitle,
  initDescription,
  initDueDate,
  initPriority = 3,
  initStatus = false
) {
  let title = initTitle;
  let description = initDescription;
  let dueDate = initDueDate;
  let priority = initPriority;
  let status = initStatus;

  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getStatus = () => status;

  function setTitle(newTitle) {
    title = newTitle;
  }

  function setDescription(newDescription) {
    description = newDescription;
  }

  function setDueDate(newDueDate) {
    dueDate = newDueDate;
  }

  function setPriority(newPriority) {
    priority = newPriority;
  }

  function setStatus(newStatus) {
    status = newStatus;
  }

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getStatus,
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    setStatus,
  };
};

export default ToDo;
