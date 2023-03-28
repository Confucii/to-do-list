import Project from "./modules/project";
import ToDo from "./modules/to-do";
import renderPage, { renderProjects, renderMainContent } from "./modules/DOM";
import "./style/style.css";

const projects = [Project("General"), Project("Aba"), Project("Bobaas")];

renderPage();
renderProjects(projects);
renderMainContent(projects[0], 0);
