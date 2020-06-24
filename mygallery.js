function Gallery(gallery) {
if (!gallery){
    throw new Error('No gallery found');
}
// select list of all the images
const images = Array.from(gallery.querySelectorAll('img'));
// select the modal
const modal = document.querySelector('.modal');
// select the Prev and Next buttons
const prevButton = modal.querySelector('.prev');
const nextButton = modal.querySelector('.next');
let currentImage;

function openModal() {
    console.info('Opening Modal...');
    // first check if the modal is already open
    if(modal.matches('.open')) {
        console.info('MODAL already Open');
        return; //will stop the function from running
    }
    // if its not open, we will ad a class of open which will open it
    modal.classList.add('open');

    // Event listeners to be bound when we open the modal
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
}

function closeModal() {
    modal.classList.remove('open');
    // add Event Listeners

    // Event listeners to be bound when we open the modal
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
}

function handleClickOutside(e) {
    if(e.target === e.currentTarget) {
        closeModal();
    }
}

function handleKeyUp(event) {
    if(event.key === 'Escape') closeModal();
    if(event.key === 'ArrowRight') showNextImage();
    if(event.key === 'ArrowLeft') showPrevImage();
    
}

function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
}

function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
}

function showImage(el) {
    if(!el) {
        console.info('no image to show');
        return;
    }
    // lets update the modal
    console.log(el);
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
}



    // Our event listeners
    images.forEach(image => image.addEventListener('click', event => showImage
    (event.currentTarget)));

    // loop over each image
    images.forEach(image => {
        // display image if Enter was clicked from the keyboard
        image.addEventListener('keyup', e => {
            if(e.key === 'Enter') {
                showImage(e.currentTarget)
            }
        })
    })

    modal.addEventListener('click', handleClickOutside);
    
}
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
