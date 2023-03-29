import closeSVG from "../images/close.svg";

export function renderOverlay() {
  const bodySelector = document.querySelector("body");

  const overlayDiv = document.createElement("div");
  overlayDiv.classList.add("overlay");

  bodySelector.appendChild(overlayDiv);
}

export function deleteOverlay() {
  const overlayDiv = document.querySelector(".overlay");
  overlayDiv.remove();
}

export function renderModal(formName, form) {
  renderOverlay();
  const bodySelector = document.querySelector("body");

  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal");

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = formName;

  modalHeader.appendChild(modalTitle);

  const modalClose = document.createElement("button");
  modalClose.classList.add("modal-close");

  const modalCloseImg = document.createElement("img");
  modalCloseImg.setAttribute("src", closeSVG);
  modalClose.appendChild(modalCloseImg);

  modalClose.addEventListener("click", () => {
    deleteOverlay();
    modalDiv.remove();
  });

  modalHeader.appendChild(modalClose);

  modalDiv.appendChild(modalHeader);

  modalDiv.appendChild(form);

  bodySelector.appendChild(modalDiv);
}

export function closeModal() {
  deleteOverlay();
  const modalDiv = document.querySelector(".modal");
  modalDiv.remove();
}
