document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.dot');

  let currentSlide = 0;
  const totalSlides = slides.length;
  // Chuyển đến slide cụ thể
  function goToSlide(slideIndex) {
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    // Cập nhật trạng thái active
    slides.forEach(slide => slide.classList.remove('active'));
    slides[slideIndex].classList.add('active');

    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
    currentSlide = slideIndex;
  }
  // Slide tiếp theo
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }

  // Slide trước đó
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  }

  // Sự kiện nút điều hướng
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Sự kiện dot điều hướng
  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      goToSlide(slideIndex);
    });
  });

  // Tự động chuyển slide (tùy chọn)
  let slideInterval = setInterval(nextSlide, 3000);

  // Dừng tự động chuyển khi hover
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 3000);
  });
});
