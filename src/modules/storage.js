import Project from "./Project";
import ToDo from "./To-do";

export function SaveData(projectObj) {
  if (Array.isArray(projectObj)) {
    const projectStorage = [];

    projectObj.forEach((project) => {
      const todos = [];

      project.getToDos().forEach((todo) => {
        const newToDo = {
          title: todo.getTitle(),
          description: todo.getDescription(),
          duedate: todo.getDueDate(),
          priority: todo.getPriority(),
          status: todo.getStatus(),
        };

        todos.push(newToDo);
      });

      const newProject = {
        title: project.getName(),
        todos,
      };

      projectStorage.push(newProject);
    });
    localStorage.setItem("projects", JSON.stringify(projectStorage));
  } else {
    const saveProject = JSON.parse(localStorage.getItem("projects"));
    let projectIndex;

    saveProject.forEach((project, index) => {
      if (project.title === projectObj.getName()) {
        projectIndex = index;
      }
    });

    const todos = [];

    projectObj.getToDos().forEach((todo) => {
      const newToDo = {
        title: todo.getTitle(),
        description: todo.getDescription(),
        duedate: todo.getDueDate(),
        priority: todo.getPriority(),
        status: todo.getStatus(),
      };

      todos.push(newToDo);
    });

    const newProject = {
      title: projectObj.getName(),
      todos,
    };

    saveProject[projectIndex] = newProject;
    localStorage.clear();
    localStorage.setItem("projects", JSON.stringify(saveProject));
  }
}

export function LoadData(projects) {
  const loader = JSON.parse(localStorage.getItem("projects"));
  loader.forEach((project, index) => {
    projects.push(Project(project.title));
    project.todos.forEach((todo) => {
      projects[index].addToDo(
        ToDo(
          todo.title,
          todo.description,
          todo.duedate,
          todo.priority,
          todo.status
        )
      );
    });
  });
}
