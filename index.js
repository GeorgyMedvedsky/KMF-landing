//menu
const menuClasses = {
    pageLocked: 'page_locked',
    triggerBtn: 'menu__button_type_trigger',
    closeBtn: 'menu__button_type_close',
    listOpen: 'menu__list_open',
    drop: '.menu__dropdown-content',
    dropOpen: 'menu__dropdown-content_open',
    arrowOpen: 'arrow-drop_open'
};
const page = document.querySelector('.page');
const menuBtn = document.querySelector('.menu__button');
const menuList = document.querySelector('.menu__list');
const menuItems = Array.from(menuList.querySelectorAll('.menu__list-item'));
const filteredMenuItems = menuItems.filter(item => item.querySelector(menuClasses.drop));

function toggleMenu() {
    menuBtn.classList.toggle(menuClasses.closeBtn);
    menuBtn.classList.toggle(menuClasses.triggerBtn);
    menuList.classList.toggle(menuClasses.listOpen);
    page.classList.toggle(menuClasses.pageLocked);
}

menuBtn.addEventListener('click', toggleMenu);

filteredMenuItems.forEach(item => {
    const title = item.querySelector('.menu__title');
    const dropdownContent = item.querySelector(menuClasses.drop);
    title.addEventListener('click', () => {
        if(!dropdownContent.classList.contains(menuClasses.dropOpen)) {
            dropdownContent.classList.add(menuClasses.dropOpen)
            title.classList.add(menuClasses.arrowOpen);
        } else {
            dropdownContent.classList.remove(menuClasses.dropOpen);
            title.classList.remove(menuClasses.arrowOpen);
        }
    });
});

// carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const carouselList = carousel.querySelector('.carousel__list');
        const carouselItems = Array.from(carousel.querySelectorAll('.carousel__item'));
        const carouselControls = carousel.querySelector('.carousel__controls');
        const prevBtn = carouselControls.querySelector('.prev');
        const nextBtn = carouselControls.querySelector('.next');

        let currentIndex = 0;
        const itemWidth = carouselItems[0].clientWidth;

        function updateCarousel() {
            const offset = -currentIndex * itemWidth;
            carouselList.style.transform = `translateX(${offset}px)`;
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex < carouselItems.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = carouselItems.length - 1;
            }
            updateCarousel();
        });

        // Swipe functionality
        carouselList.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carouselList.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        carouselList.addEventListener('touchend', () => {
            if (startX > endX + 50) {
                // Swipe left
                if (currentIndex < carouselItems.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
            } else if (startX < endX - 50) {
                // Swipe right
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = carouselItems.length - 1;
                }
            }
            updateCarousel();
        });

        updateCarousel();
    });
});

