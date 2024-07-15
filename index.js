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

//slider
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const images = Array.from(slider.querySelectorAll('.slider__image'));
    const tabs = Array.from(slider.querySelectorAll('.slider__tab'));
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('slider__image_active', i === index);
        });
        tabs.forEach((tab, i) => {
            tab.classList.toggle('slider__tab_active', i === index);
            tab.querySelector('.slider__dot').classList.toggle('slider__dot_active', i === index);
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    showImage(currentIndex);

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        if (startX > endX + 50) {
            nextImage();
        } else if (startX < endX - 50) {
            prevImage();
        }
    });
});

