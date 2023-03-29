import format from "date-fns/format"; // eslint-disable-line import/no-extraneous-dependencies
import cleaner from "./cleaner";
import deleteImgSVG from "../images/delete-forever.svg";
import plusSVG from "../images/plus.svg";
import closeSVG from "../images/close.svg";
import dangerSVG from "../images/skull.svg";
import editSVG from "../images/pencil.svg";
import doneSVG from "../images/check.svg";
import expandSVG from "../images/chevron-down.svg";
import ToDo from "./To-do";

import { closeModal, renderModal } from "./modals";

function toDoInfo(todo) {
  const toDoInfoDiv = document.createElement("div");
  toDoInfoDiv.classList.add("todo-info");

  const toDoTitle = document.createElement("p");
  toDoTitle.textContent = `Name: ${todo.getTitle()}`;

  const toDoDescription = document.createElement("p");
  toDoDescription.textContent = `Description: ${todo.getDescription()}`;

  const toDoDate = document.createElement("p");
  toDoDate.textContent = `Deadline: ${format(
    new Date(todo.getDueDate()),
    "dd/MM/yy"
  )}`;

  const toDoDanger = document.createElement("p");
  toDoDanger.textContent = `Danger level: ${todo.getPriority()}/5`;

  const toDoStatus = document.createElement("p");
  const currentStatus = !todo.getStatus() ? "Hunt Ongoing" : "Terminated";
  toDoStatus.textContent = `Status: ${currentStatus}`;

  toDoInfoDiv.appendChild(toDoTitle);
  toDoInfoDiv.appendChild(toDoDescription);
  toDoInfoDiv.appendChild(toDoDate);
  toDoInfoDiv.appendChild(toDoDanger);
  toDoInfoDiv.appendChild(toDoStatus);

  renderModal(`${todo.getTitle()} info`, toDoInfoDiv);
}

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

    const toDoDate = document.createElement("p");
    toDoDate.classList.add("todo-date");
    toDoDate.textContent = format(new Date(todo.getDueDate()), "dd/MM/yy");
    newToDo.appendChild(toDoDate);

    const expandImg = document.createElement("img");
    expandImg.setAttribute("src", expandSVG);
    expandImg.classList.add("todo-expand");

    expandImg.addEventListener("click", () => {
      toDoInfo(todo);
    });
    newToDo.appendChild(expandImg);

    const editImg = document.createElement("img");
    editImg.setAttribute("src", editSVG);
    editImg.classList.add("todo-edit");

    editImg.addEventListener("click", () => {
      renderModal("Edit target", addToDoForm(project, todo)); // eslint-disable-line no-use-before-define
    });
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

function createOption(value, text, selected = false) {
  const option = document.createElement("option");
  option.value = value;
  option.text = text;
  if (selected) option.selected = true;
  return option;
}

function addToDoForm(project, todo = false) {
  const toDoForm = document.createElement("form");
  toDoForm.classList.add("todo-modal-form");

  const toDoNameLabel = document.createElement("label");
  toDoNameLabel.textContent = "Target name";
  toDoNameLabel.setAttribute("for", "todo-name");

  toDoForm.appendChild(toDoNameLabel);

  const toDoName = document.createElement("input");
  toDoName.setAttribute("type", "text");
  toDoName.setAttribute("id", "todo-name");
  toDoName.setAttribute("name", "todo-name");
  toDoName.setAttribute("minlength", "2");
  toDoName.setAttribute("maxlength", "20");
  toDoName.required = true;

  toDoForm.appendChild(toDoName);

  const toDoDateLabel = document.createElement("label");
  toDoDateLabel.textContent = "Deadline";
  toDoDateLabel.setAttribute("for", "todo-date");

  toDoForm.appendChild(toDoDateLabel);

  const toDoDate = document.createElement("input");
  toDoDate.setAttribute("type", "date");
  toDoDate.setAttribute("id", "todo-date");
  toDoDate.setAttribute("name", "todo-date");
  toDoDate.setAttribute("min", new Date().toJSON().slice(0, 10));
  toDoDate.setAttribute("value", new Date().toJSON().slice(0, 10));

  toDoForm.appendChild(toDoDate);

  const toDoPriorityLabel = document.createElement("label");
  toDoPriorityLabel.textContent = "Danger level";
  toDoPriorityLabel.setAttribute("for", "todo-priority");

  toDoForm.appendChild(toDoPriorityLabel);

  const toDoPriority = document.createElement("select");
  toDoPriority.setAttribute("id", "todo-priority");
  toDoPriority.setAttribute("name", "todo-priority");

  toDoPriority.appendChild(createOption("1", "Green Toad"));
  toDoPriority.appendChild(createOption("2", "Yellow Cat"));
  toDoPriority.appendChild(createOption("3", "Orange Tiger", true));
  toDoPriority.appendChild(createOption("4", "Red Dragon"));
  toDoPriority.appendChild(createOption("5", "Dark Nightmare"));

  toDoForm.appendChild(toDoPriority);

  const toDoDescriptionLabel = document.createElement("label");
  toDoDescriptionLabel.textContent = "Description";
  toDoDescriptionLabel.setAttribute("for", "todo-description");

  toDoForm.appendChild(toDoDescriptionLabel);

  const toDoDescription = document.createElement("textarea");
  toDoDescription.setAttribute("id", "todo-description");
  toDoDescription.setAttribute("name", "todo-description");
  toDoDescription.setAttribute("rows", "4");

  toDoForm.appendChild(toDoDescription);

  const submitBtn = document.createElement("input");
  submitBtn.setAttribute("type", "submit");

  if (todo) {
    submitBtn.setAttribute("value", "Edit");

    toDoName.value = todo.getTitle();
    toDoDescription.value = todo.getDescription();
    toDoDate.value = todo.getDueDate();
    toDoPriority.value = todo.getPriority();

    toDoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      todo.setTitle(toDoName.value);
      todo.setDescription(toDoDescription.value);
      todo.setDueDate(toDoDate.value);
      todo.setPriority(toDoPriority.value);
      renderToDos(project);
      closeModal();
    });
  } else {
    submitBtn.setAttribute("value", "Add");

    toDoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      project.addToDo(
        ToDo(
          toDoName.value,
          toDoDescription.value,
          toDoDate.value,
          toDoPriority.value
        )
      );
      renderToDos(project);
      closeModal();
    });
  }

  toDoForm.appendChild(submitBtn);

  return toDoForm;
}

function renderAddToDoBtn(project) {
  const todos = document.querySelector(".todos");

  const addToDoBtn = document.createElement("button");
  addToDoBtn.classList.add("add-todo-btn");

  const addButtonImage = document.createElement("img");
  addButtonImage.setAttribute("src", plusSVG);
  addToDoBtn.appendChild(addButtonImage);

  addToDoBtn.addEventListener("click", () => {
    renderModal("Add target", addToDoForm(project));
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
  renderAddToDoBtn(project);
  renderToDos(project);
}
