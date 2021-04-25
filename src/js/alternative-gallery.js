import gallery from "./gallery-items.js";
const refs = {
  gallery: document.querySelector(".gallery"),
  modal: document.querySelector(".lightbox"),
  modalImg: document.querySelector(".lightbox__image"),
};
let activeIndex = 0;
const markup = gallery.map(({ preview, original, description }) => {
  return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
    </a>
    </li>`;
});
refs.gallery.insertAdjacentHTML("beforeend", markup.join(""));
refs.gallery.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }
  markup.forEach((el, ind) => {
    if (el.includes(e.target.src)) {
      activeIndex = ind;
    }
  });
  refs.modalImg.src = e.target.dataset.source;
  refs.modal.classList.add("is-open");
});
refs.modal.addEventListener("click", (e) => {
  if (e.target.nodeName === "IMG") {
    return;
  }
  onCloseModal();
});
function onCloseModal() {
  refs.modal.classList.remove("is-open");
  refs.modalImg.src = "";
}
function keyboardManipulation({ key }) {
  switch (key) {
    case gallery.length - 1 > activeIndex && "ArrowRight":
      activeIndex += 1;
      refs.modalImg.src = gallery[activeIndex].original;
      break;
    case activeIndex > 0 && "ArrowLeft":
      activeIndex -= 1;
      refs.modalImg.src = gallery[activeIndex].original;
      break;
    case activeIndex === gallery.length - 1 && "ArrowRight":
      activeIndex = 0;
      refs.modalImg.src = gallery[activeIndex].original;
      break;
    case activeIndex === 0 && "ArrowLeft":
      activeIndex = gallery.length - 1;
      refs.modalImg.src = gallery[activeIndex].original;
      break;
    case "Escape":
      onCloseModal();
      break;
    default:
      alert("что-то пошло не так");
  }
}
window.addEventListener("keyup", keyboardManipulation);
