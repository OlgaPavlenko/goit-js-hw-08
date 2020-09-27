import galleryItems from './gallery-items.js';

const galleryItemsContainer = document.querySelector('.js-gallery');
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);
const modalWindowOpen = document.querySelector('.lightbox');
const changeSrcModalWindowOpen = document.querySelector('.lightbox__image');
const closeModalWindowElement = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const closeModalWindowOverlayElement = document.querySelector(
  '.lightbox__overlay',
);

galleryItemsContainer.insertAdjacentHTML('beforeend', galleryItemsMarkup);

galleryItemsContainer.addEventListener('click', onGalleryItemsClick);

galleryItemsContainer.addEventListener(
  'click',
  openModalWindowOnGalleryItemsClick,
);

closeModalWindowElement.addEventListener(
  'click',
  closeModalWindowOnCloseItemClick,
);

closeModalWindowOverlayElement.addEventListener(
  'click',
  closeModalWindowOnOverayElemClick,
);

document.addEventListener('keydown', closeModalWindowEsc);

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  
      `;
    })
    .join('');
}

function onGalleryItemsClick(e) {
  e.preventDefault();

  if (!e.target.classList.contains('gallery__image')) {
    return;
  }

  changeSrcModalWindowOpen.src = e.target.dataset.source;

  return;
}

function openModalWindowOnGalleryItemsClick(e) {
  modalWindowOpen.classList.add('is-open');
  return;
}

function closeModalWindowOnCloseItemClick(e) {
  modalWindowOpen.classList.remove('is-open');
  changeSrcModalWindowOpen.src = '';

  return;
}

function closeModalWindowOnOverayElemClick(e) {
  modalWindowOpen.classList.remove('is-open');
  changeSrcModalWindowOpen.src = '';

  return;
}

function closeModalWindowEsc(e) {
  if (e.keyCode == 27) {
    modalWindowOpen.classList.remove('is-open');
    changeSrcModalWindowOpen.src = '';
  }
}
