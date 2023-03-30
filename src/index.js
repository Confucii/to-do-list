import Project from "./modules/Project";
import renderPage from "./modules/DOM";
import "./style/style.css";
import { LoadData, SaveData } from "./modules/storage";

(function init() {
  let projects = [];
  if (localStorage.getItem("projects") === null) {
    projects = [Project("General")];
    SaveData(projects);
  } else {
    LoadData(projects);
  }

  renderPage(projects);
})();
