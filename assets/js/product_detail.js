const thumbImgs = document.querySelectorAll('.thumbnail');
thumbImgs.forEach(thumbnail => {
  thumbnail.addEventListener('click', function () {
    thumbImgs.forEach(thumbnail => {
      thumbnail.classList.remove('active');
    });
    thumbnail.classList.add('active');
    const mainImg = document.querySelector('.main-image img');
    mainImg.src = this.querySelector('img').src;
  });
});
////////////
const chooseSize = document.querySelectorAll('.size-option:not(.disabled)');
chooseSize.forEach(size => {
  size.addEventListener('click', function () {
    chooseSize.forEach(size => {
      size.classList.remove('selected');
    });
    this.classList.add('selected');
  });
});
