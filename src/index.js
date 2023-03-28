import Project from "./project";
import ToDo from "./to-do";
import renderPage from "./DOM";

const projects = [Project("default")];

projects[0].addToDo(ToDo("Do", "It is cool", 2));
projects[0].addToDo(ToDo("Do", "It is cool", 2));
projects[0].addToDo(ToDo("Do", "It is cool", 2));

projects[0].getToDos();
projects[0].removeToDo(1);
projects[0].getToDos();
console.log(projects[0].getToDo(0).setTitle("Boba"));
console.log(projects[0].getToDo(0).getTitle());
console.log(projects[0].getToDo(1).getTitle());
console.log(projects[0].getToDos());
renderPage();
