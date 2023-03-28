import Project from "./modules/project";
import ToDo from "./modules/to-do";
import renderPage, { renderSidebar, renderProjects } from "./modules/DOM";
import "./style/style.css";

const projects = [Project("Boba"), Project("Aba"), Project("Bobaas")];

renderPage();
renderSidebar();
renderProjects(projects);
