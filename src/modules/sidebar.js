import cleaner from "./cleaner";
import renderMainContent from "./todos";
import deleteImgSVG from "../images/delete-forever.svg";
import editSVG from "../images/pencil.svg";
import Project from "./Project";
import plusSVG from "../images/plus.svg";
import { closeModal, renderModal } from "./modals";

function renderProjects(projects) {
  const projectsRef = projects;
  const projectHolder = document.querySelector(".projects");

  cleaner(projectHolder);

  projectsRef.forEach((element, index) => {
    const newProject = document.createElement("div");
    newProject.classList.add("project");
    newProject.setAttribute("data-index", index);

    const projectName = document.createElement("p");
    projectName.textContent = element.getName();

    projectName.addEventListener("click", () => {
      renderMainContent(projectsRef[index], index);
    });

    newProject.appendChild(projectName);
    if (index > 0) {
      const editImg = document.createElement("img");
      editImg.setAttribute("src", editSVG);

      editImg.addEventListener("click", () => {
        renderModal("Edit category", addProjectForm(projects, element)); // eslint-disable-line no-use-before-define
      });

      newProject.append(editImg);

      const deleteImg = document.createElement("img");
      deleteImg.setAttribute("src", deleteImgSVG);

      deleteImg.addEventListener("click", () => {
        const currentProject = document.querySelector(".todos").dataset.project;
        if (Number(currentProject) === index)
          renderMainContent(projectsRef[0], 0);
        projectsRef.splice(index, 1);
        renderProjects(projectsRef);
      });

      newProject.appendChild(deleteImg);
    }
    projectHolder.appendChild(newProject);
  });
}

function addProjectForm(projects, project = false) {
  const projectForm = document.createElement("form");
  projectForm.classList.add("project-modal-form");

  const projectNameLabel = document.createElement("label");
  projectNameLabel.textContent = "Name";
  projectNameLabel.setAttribute("for", "project-name");

  projectForm.appendChild(projectNameLabel);

  const projectName = document.createElement("input");
  projectName.setAttribute("type", "text");
  projectName.setAttribute("id", "project-name");
  projectName.setAttribute("name", "project-name");
  projectName.setAttribute("minlength", "3");
  projectName.setAttribute("maxlength", "15");
  projectName.required = true;

  projectForm.appendChild(projectName);

  const submitBtn = document.createElement("input");
  submitBtn.setAttribute("type", "submit");

  if (project) {
    projectName.value = project.getName();

    submitBtn.setAttribute("value", "Edit");

    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      project.setName(projectName.value);
      closeModal();
      renderProjects(projects);
    });
  } else {
    submitBtn.setAttribute("value", "Add");

    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      projects.push(Project(projectName.value));
      closeModal();
      renderProjects(projects);
    });
  }
  projectForm.appendChild(submitBtn);

  return projectForm;
}

function renderAddProjectBtn(projects) {
  const sidebar = document.querySelector(".sidebar");
  const addProject = document.createElement("button");
  addProject.classList.add("add-project-btn");

  const addButtonImage = document.createElement("img");
  addButtonImage.setAttribute("src", plusSVG);
  addProject.appendChild(addButtonImage);

  addProject.addEventListener("click", () => {
    renderModal("Add category", addProjectForm(projects));
  });

  sidebar.appendChild(addProject);
}

export default function renderSidebar(projects) {
  const sidebar = document.querySelector(".sidebar");

  const sideTitle = document.createElement("h2");
  sideTitle.textContent = "Categories";
  sidebar.appendChild(sideTitle);

  const projectHolder = document.createElement("div");
  projectHolder.classList.add("projects");
  sidebar.appendChild(projectHolder);
  renderProjects(projects);

  renderAddProjectBtn(projects);
}
