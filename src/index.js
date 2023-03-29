import Project from "./modules/Project";
import renderPage from "./modules/DOM";
import "./style/style.css";

(function init() {
  const projects = [Project("General")];

  renderPage(projects);
})();
