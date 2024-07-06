function createImage(src) {
  const image = document.createElement('img');
  image.src = src;
  return image;
}

function createHyperLink(href) {
  const a = document.createElement('a');
  a.href = href;
  return a;
}

function createArrow(nextArrow){
  const span = document.createElement('span');
  span.classList.add('material-symbols-outlined');
  span.classList.add('white-text');
  span.classList.add('pointer');

  textContent = null;
  if(nextArrow) {
    span.textContent = "arrow_forward";
  }
  else {
    span.textContent = "arrow_back";
  }
  return span;
}
// Appends image with imgSrc along with forward and backward arrows
function appendImage(container, imgSrc) {

  const image = createImage(imgSrc);
  container.appendChild(prevArrow)
  container.appendChild(image);
  container.appendChild(nextArrow);
}

function onThumbnailClick(event) {
  event.preventDefault();
  currentIndex = event.currentTarget.dataset.index;
  appendImage(modalView, event.currentTarget.src);

  document.body.classList.add('no-scroll');
  modalView.style.top = (window.scrollY || window.pageYOffSet) + (NAV_HEIGHT/2) + 'px';
  modalView.classList.remove('hidden');

  document.addEventListener('keydown', nextPhoto);
}

function onModalClick() {
  hideModal();
}

function onNextImgClick(event) {
  nextPhoto({key:"ArrowRight"})
  event.stopPropagation();
}

function onPrevImgClick(event) {
  nextPhoto({key:"ArrowLeft"})
  event.stopPropagation();
}


function hideModal() {
  document.body.classList.remove('no-scroll');
  modalView.classList.add('hidden');
  modalView.innerHTML = '';
  document.removeEventListener('keydown', nextPhoto);
}

function nextPhoto(event) {
  if (event.key === 'Escape') {
    hideModal();
    return;
  }

  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
    return;
  }

  let nextIndex = currentIndex;
  if (event.key === 'ArrowLeft') {
    nextIndex--;
  } else {
    nextIndex++;
  }

  if (nextIndex < 0 || nextIndex == PHOTO_LIST.length) {
    return;
  }
  const photoSrc = PHOTO_LIST[nextIndex];
  modalView.innerHTML = '';
  appendImage(modalView, photoSrc);
  currentIndex = nextIndex;
}



let currentIndex = null;
const albumView = document.querySelector('#images');
for (let i = 0; i < PHOTO_LIST.length; i++) {
  const photoSrc = PHOTO_LIST[i];
  const image = createImage(photoSrc);
  const containerLink = createHyperLink('#');
  containerLink.appendChild(image);
  image.dataset.index = i;
  image.addEventListener('click', onThumbnailClick);
  albumView.appendChild(containerLink);
}

const modalView = document.querySelector('#modal-view');
modalView.addEventListener('click', onModalClick);

const nextArrow = createArrow(true);
const prevArrow = createArrow(false);
nextArrow.addEventListener('click', onNextImgClick);
prevArrow.addEventListener('click', onPrevImgClick);

