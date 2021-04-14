import gallery from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const modalCloseButtonRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightBoxOverlayRef = document.querySelector('.lightbox__overlay');

function makeElementMarkup({ preview, original, description }) {
  return `<li><a class="gallery__link" href=${original}><img class="gallery__image" src=${preview} data-source=${original} alt=${description}/></a></li>`;
}

function addNewElementsMarkup() {
  galleryRef.insertAdjacentHTML(
    'beforeend',
    gallery.map(makeElementMarkup).join(''),
  );
}
addNewElementsMarkup();

function makeImagesArrow() {
  const imagesArrow = [];
  gallery.forEach(element => {
    imagesArrow.push(element.original);
  });
  return imagesArrow;
}

const imagesArrow = makeImagesArrow();
console.log(imagesArrow);

function openModal() {
  lightboxRef.classList.add('is-open');
  window.addEventListener('keydown', onEscapePress);
}

function closeModal() {
  lightboxImageRef.src = '';
  lightboxRef.classList.remove('is-open');
  window.removeEventListener('keydown', onEscapePress);
}

function onEscapePress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function onGalleryElementClick(event) {
  event.preventDefault();
  if (event.target.classList.contains('gallery__image')) {
    lightboxImageRef.src = event.target.getAttribute('data-source');
    openModal();
  }
}

galleryRef.addEventListener('click', onGalleryElementClick);
modalCloseButtonRef.addEventListener('click', closeModal);
lightBoxOverlayRef.addEventListener('click', closeModal);
