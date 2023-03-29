import Project from "./modules/project";
import ToDo from "./modules/to-do";
import renderPage from "./modules/DOM";
import "./style/style.css";

function init() {
  const projects = [Project("General")];
  projects[0].addToDo(ToDo("Jason", "Maniac killer", "29/03/23", 4, false));
  projects[0].addToDo(ToDo("Jason", "Maniac killer", "29/03/23", 4, false));
  projects[0].addToDo(ToDo("Jason", "Maniac killer", "29/03/23", 4, false));
  projects[0].addToDo(ToDo("Jason", "Maniac killer", "29/03/23", 4, false));
  projects[0].addToDo(ToDo("Jason", "Maniac killer", "29/03/23", 4, false));

  renderPage(projects);
}

init();
