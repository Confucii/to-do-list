import Project from "./modules/project";
import ToDo from "./modules/to-do";
import renderPage, { renderProjects, renderMainContent } from "./modules/DOM";
import "./style/style.css";

function init() {
  const projects = [Project("General")];

  renderPage();
  renderProjects(projects);
  renderMainContent(projects[0], 0);
}

init();
