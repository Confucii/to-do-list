import cleaner from "./cleaner";
import deleteImgSVG from "../images/delete-forever.svg";
import plusSVG from "../images/plus.svg";
import closeSVG from "../images/close.svg";
import dangerSVG from "../images/skull.svg";
import editSVG from "../images/pencil.svg";
import doneSVG from "../images/check.svg";
import expandSVG from "../images/chevron-down.svg";
import { renderModal } from "./modals";

function renderToDos(project) {
  const todos = document.querySelector(".todos");

  while (
    todos.firstChild &&
    !todos.firstChild.classList.contains("add-todo-btn")
  ) {
    todos.firstChild.remove();
  }

  const todosArr = project.getToDos();
  todosArr.forEach((todo, index) => {
    const newToDo = document.createElement("div");
    newToDo.classList.add("todo-div");
    newToDo.setAttribute("data-index", index);
    newToDo.setAttribute("data-danger", todo.getPriority());
    newToDo.setAttribute("data-status", todo.getStatus());

    const checkImage = document.createElement("img");
    checkImage.classList.add("todo-check");
    if (newToDo.dataset.status === "false") {
      checkImage.setAttribute("src", doneSVG);
    } else {
      checkImage.setAttribute("src", closeSVG);
    }

    checkImage.addEventListener("click", () => {
      todo.toggleStatus();
      renderToDos(project);
    });
    newToDo.appendChild(checkImage);

    const dangerImage = document.createElement("img");
    dangerImage.classList.add("todo-danger");
    dangerImage.setAttribute("src", dangerSVG);
    newToDo.appendChild(dangerImage);

    const toDoName = document.createElement("p");
    toDoName.classList.add("todo-name");
    toDoName.textContent = todo.getTitle();
    newToDo.appendChild(toDoName);

    const expandImg = document.createElement("img");
    expandImg.setAttribute("src", expandSVG);
    expandImg.classList.add("todo-expand");

    expandImg.addEventListener("click", () => {});
    newToDo.appendChild(expandImg);

    const editImg = document.createElement("img");
    editImg.setAttribute("src", editSVG);
    editImg.classList.add("todo-edit");

    editImg.addEventListener("click", () => {});
    newToDo.appendChild(editImg);

    const deleteImg = document.createElement("img");
    deleteImg.setAttribute("src", deleteImgSVG);
    deleteImg.classList.add("todo-delete");

    deleteImg.addEventListener("click", () => {
      project.removeToDo(index);
      renderToDos(project);
    });
    newToDo.appendChild(deleteImg);

    todos.insertBefore(newToDo, document.querySelector(".add-todo-btn"));
  });
}

function renderAddToDoBtn() {
  const todos = document.querySelector(".todos");

  const addToDoBtn = document.createElement("button");
  addToDoBtn.classList.add("add-todo-btn");

  const addButtonImage = document.createElement("img");
  addButtonImage.setAttribute("src", plusSVG);
  addToDoBtn.appendChild(addButtonImage);

  addToDoBtn.addEventListener("click", () => {
    renderModal("Add target", document.createElement("form"));
  });

  todos.appendChild(addToDoBtn);
}

export default function renderMainContent(project, index) {
  const mainContent = document.querySelector(".main");

  cleaner(mainContent);

  const contentName = document.createElement("h1");
  contentName.textContent = project.getName();
  mainContent.appendChild(contentName);

  const todos = document.createElement("div");
  todos.classList.add("todos");
  todos.setAttribute("data-project", index);
  mainContent.appendChild(todos);
  renderAddToDoBtn();
  renderToDos(project);
}
