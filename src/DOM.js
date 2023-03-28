export default function renderPage() {
  const bodySelector = document.querySelector("body");

  const content = document.createElement("div");
  content.classList.add("content");
  bodySelector.appendChild(content);
}
