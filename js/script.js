import gallery from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox')

{/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li> */}
{/* <li><a class="gallery__link" href=''><img class="gallery__image" src='' data-source='' alt=''/></a></li> */ }


const makeListElement = ({preview, original, description}) => {
    // return `<li><a class="gallery__link" href=${original}><img class="gallery__image" src=${preview} data-source=${original} alt=${description}/></a></li>`;
    return `<li><img class="gallery__image" src=${preview} data-source=${original} alt=${description}/></li>`;
};

const elementList = gallery.map(makeListElement).join('');
galleryRef.insertAdjacentHTML('beforeend', elementList)


// Реалізація делегування на галереї ul.js-gallery і отримання url великого зображення.
const onGalleryElementClick = (event) => {
    // if (event.target.classList.contains("gallery__link")) {
    //     lightboxRef.classList.add('is-open')
    //     return (event.target.href)
    //}
    if (event.target.classList.contains("gallery__image")){
        console.log('onGalleryElementClick');
        console.log(event.target.src);
        lightboxRef.classList.add('is-open')
    }
}
galleryRef.addEventListener('click', onGalleryElementClick)

// Відкриття модального вікна при натисканні на елементі галереї.

