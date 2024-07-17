// const links = Array.from(document.getElementsByTagName('a'));
// links.forEach(link => {
//     link.addEventListener('mousedown', evt => {
//         evt.preventDefault();
//     });
// });


//menu
const menuClasses = {
    PAGE: 'page',
    PAGE_LOCKED: 'page_locked',
    BURGER_ICON: 'burger',
    BURGER_ICON_ACTIVE: 'active',
    MENU_LIST: 'menu__list',
    MENU_LIST_OPEN: 'menu__list_open',
    MENU_ITEM: 'menu__list-item',
    MENU_TITLE: 'menu__title',
    DROPDOWN_CONTENT: 'menu__dropdown-content',
    DROPDOWN_CONTENT_OPEN: 'menu__dropdown-content_open'
};
const page = document.querySelector(`.${menuClasses.PAGE}`);
const burgerIcon = document.querySelector(`.${menuClasses.BURGER_ICON}`);
const menu = document.querySelector(`.${menuClasses.MENU_LIST}`);
const menuItems = Array.from(menu.querySelectorAll(`.${menuClasses.MENU_ITEM}:has(.${menuClasses.DROPDOWN_CONTENT})`));

burgerIcon.addEventListener('click', function () {
    this.classList.toggle(menuClasses.BURGER_ICON_ACTIVE);
    menu.classList.toggle(menuClasses.MENU_LIST_OPEN);
    page.classList.toggle(menuClasses.PAGE_LOCKED);
});

menuItems.forEach(item => {
    const title = item.querySelector(`.${menuClasses.MENU_TITLE}`);
    const dropdownContent = item.querySelector(`.${menuClasses.DROPDOWN_CONTENT}`);
    title.addEventListener('click', function () {
        this.classList.toggle('arrow-drop_open');
        dropdownContent.classList.toggle(menuClasses.DROPDOWN_CONTENT_OPEN);
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


