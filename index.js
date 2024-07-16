//menu
const page = document.querySelector('.page');
const burgerIcon = document.querySelector('.burger');
const menu = document.querySelector('.menu__list');
const menuItems = Array.from(menu.querySelectorAll('.menu__list-item'));
const filteredMenuItems = menuItems.filter(item => item.querySelector('.menu__dropdown-content'));

burgerIcon.addEventListener('click', function () {
    this.classList.toggle('active');
    menu.classList.toggle('menu__list_open');
    page.classList.toggle('page_locked');
});

filteredMenuItems.forEach(item => {
    const title = item.querySelector('.menu__title');
    const dropdownContent = item.querySelector('.menu__dropdown-content');
    title.addEventListener('click', function () {
        this.classList.toggle('arrow-drop_open');
        dropdownContent.classList.toggle('menu__dropdown-content_open');
    });
});

// carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const carouselList = carousel.querySelector('.carousel__list');
        const carouselItems = Array.from(carousel.querySelectorAll('.carousel__item'));
        const carouselControls = carousel.querySelector('.carousel__controls');
        const prevBtn = carouselControls.querySelector('.prev');
        const nextBtn = carouselControls.querySelector('.next');
        let startX, startY, endX, endY;
        
        let currentIndex = 0;
        const itemWidth = carouselItems[0].clientWidth;

        function updateCarousel(gap) {
            const offset = -currentIndex * (itemWidth + gap);
            carouselList.style.transform = `translateX(${offset}px)`;
        }

        // nextBtn.addEventListener('click', () => {
        //     if (currentIndex < carouselItems.length - 1) {
        //         currentIndex++;
        //     } else {
        //         currentIndex = 0;
        //     }
        //     updateCarousel();
        // });

        // prevBtn.addEventListener('click', () => {
        //     if (currentIndex > 0) {
        //         currentIndex--;
        //     } else {
            //         currentIndex = carouselItems.length - 1;
        //     }
        //     updateCarousel();
        // });

        carouselList.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        carouselList.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
            endY = e.touches[0].clientY;

            if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
                e.preventDefault();
            }
        });

        carouselList.addEventListener('touchend', () => {
            if (startX > endX + 50) {
                if (currentIndex < carouselItems.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
            } else if (startX < endX - 50) {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = carouselItems.length - 1;
                }
            }
            updateCarousel(16);
        });

        updateCarousel();
    });
});


