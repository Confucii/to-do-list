import Project from "./modules/project";
import ToDo from "./modules/to-do";
import renderPage from "./modules/DOM";
import "./style/style.css";

function init() {
  const projects = [Project("General")];

  renderPage(projects);
}

init();
