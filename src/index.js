import Project from "./modules/Project";
import ToDo from "./modules/To-do";
import renderPage from "./modules/DOM";
import "./style/style.css";

function init() {
  const projects = [Project("General")];
  projects[0].addToDo(ToDo("Jason", "Manica killer", "2023-03-29", 1, false));
  projects[0].addToDo(ToDo("Jason", "Maniac killer", "2023-03-29", 2, false));
  projects[0].addToDo(ToDo("Jason", "Maniac killer", "2023-03-29", 3, false));
  projects[0].addToDo(ToDo("Jason", "Maniac killer", "2023-03-29", 4, false));
  projects[0].addToDo(ToDo("Jason", "Maniac killer", "2023-03-29", 5, false));

  renderPage(projects);
}

init();
