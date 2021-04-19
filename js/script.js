import gallery from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightBoxOverlayRef = document.querySelector('.lightbox');

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

const imagesArray = gallery.map(elem => elem.original);

function openModal() {
  lightboxRef.classList.add('is-open');
  window.addEventListener('keyup', onKeyPress);
  lightBoxOverlayRef.addEventListener('click', onLightBoxOverlayClick);
}

function closeModal() {
  lightboxImageRef.src = '';
  lightboxRef.classList.remove('is-open');
  window.removeEventListener('keyup', onKeyPress);
  lightBoxOverlayRef.removeEventListener('click', onLightBoxOverlayClick);
}

function onLightBoxOverlayClick(event) {
  if (event.target.nodeName !== 'IMG') {
    closeModal();
  }
}

function onGalleryElementClick(event) {
  event.preventDefault();
  if (event.target.classList.contains('gallery__image')) {
    imageIndex = imagesArray.indexOf(event.target.getAttribute('data-source'));
    lightboxImageRef.src = imagesArray[imageIndex];
    openModal();
  }
}

let imageIndex;

function onKeyPress(event) {
  if (event.code === 'Escape') {
    closeModal();
    return;
  }

  let currentIndex = imageIndex;

  if (event.code === 'ArrowRight') {
    if (currentIndex + 1 >= imagesArray.length) {
      imageIndex = 0;
    } else imageIndex = currentIndex + 1;
  } else if (event.code === 'ArrowLeft') {
    if (currentIndex - 1 < 0) {
      imageIndex = imagesArray.length - 1;
    } else imageIndex = currentIndex - 1;
  }
  lightboxImageRef.src = imagesArray[imageIndex];
}

galleryRef.addEventListener('click', onGalleryElementClick);
