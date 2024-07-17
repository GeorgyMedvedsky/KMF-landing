function resetDefaultBehaviorForLinks() {
    const links = Array.from(document.getElementsByTagName('a'));
    links.forEach(link => {
        link.addEventListener('click', evt => {
            evt.preventDefault();
        });
    });
}

function setMenuFunctionality() {
    const classes = {
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
    const page = document.querySelector(`.${classes.PAGE}`);
    const burgerIcon = document.querySelector(`.${classes.BURGER_ICON}`);
    const menu = document.querySelector(`.${classes.MENU_LIST}`);
    const menuItems = Array.from(menu.querySelectorAll(`.${classes.MENU_ITEM}:has(.${classes.DROPDOWN_CONTENT})`));
    
    burgerIcon.addEventListener('click', function () {
        this.classList.toggle(classes.BURGER_ICON_ACTIVE);
        menu.classList.toggle(classes.MENU_LIST_OPEN);
        page.classList.toggle(classes.PAGE_LOCKED);
    });
    
    menuItems.forEach(item => {
        const title = item.querySelector(`.${classes.MENU_TITLE}`);
        const dropdownContent = item.querySelector(`.${classes.DROPDOWN_CONTENT}`);
        title.addEventListener('click', function () {
            this.classList.toggle('arrow-drop_open');
            dropdownContent.classList.toggle(classes.DROPDOWN_CONTENT_OPEN);
        });
    });
}

function setCarouselFunctionality() {
    document.addEventListener('DOMContentLoaded', () => {
        const classes = {
            CAROUSEL: 'carousel',
            CAROUSEL_LIST: 'carousel__list',
            CAROUSEL_ITEM: 'carousel__item',
            CAROUSEL_CONTROLS: 'carousel__controls',
            CAROUSEL_TABS: 'carousel__tabs',
            CAROUSEL_TAB: 'carousel__tab',
            CAROUSEL_TAB_ACTIVE: 'carousel__tab_active',
            CAROUSEL_DOT: 'carousel__dot',
            CAROUSEL_DOT_ACTIVE: 'carousel__dot_active'
        };
        const carousels = document.querySelectorAll(`.${classes.CAROUSEL}`);
    
        carousels.forEach(carousel => {
            const tabTemplate = document.querySelector('#tab-template').content;
            const carouselList = carousel.querySelector(`.${classes.CAROUSEL_LIST}`);
            const carouselItems = Array.from(carousel.querySelectorAll(`.${classes.CAROUSEL_ITEM}`));
            const carouselControls = carousel.querySelector(`.${classes.CAROUSEL_CONTROLS}`);
            const tabList = carouselControls.querySelector(`.${classes.CAROUSEL_TABS}`);
            const prevBtn = carouselControls.querySelector('.prev');
            const nextBtn = carouselControls.querySelector('.next');
            let startX, startY, endX, endY;
            let currentIndex = 0;
            const itemWidth = carouselItems[0].clientWidth;
            const itemWidthForHeader = (carouselList.offsetWidth * (100 / 100));

            createTabs(carouselItems.length);

            const tabs = Array.from(tabList.querySelectorAll(`.${classes.CAROUSEL_TAB}`));
            const dots = Array.from(tabList.querySelectorAll(`.${classes.CAROUSEL_DOT}`));
    
            function createTabs(length) {
                for(let i = 0; i < length; i++) {
                    const tab = tabTemplate.querySelector(`.${classes.CAROUSEL_TAB}`).cloneNode(true);
                    tabList.append(tab);
                }
            }

            function updateCarousel(gap = 16) {
                const offset = carousel.id !== 'carousel-for-heading'
                    ? -currentIndex * (itemWidth + gap)
                    : -currentIndex * (itemWidthForHeader + gap);
                carouselList.style.transform = `translateX(${offset}px)`;
                tabs.forEach(tab => tab.classList.remove(classes.CAROUSEL_TAB_ACTIVE));
                dots.forEach(dot => dot.classList.remove(classes.CAROUSEL_DOT_ACTIVE));
                tabs[currentIndex].classList.add(classes.CAROUSEL_TAB_ACTIVE);
                dots[currentIndex].classList.add(classes.CAROUSEL_DOT_ACTIVE);
            }

            nextBtn.addEventListener('click', () => {
                if (currentIndex < carouselItems.length - 1) currentIndex++;
                updateCarousel();
            });
    
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) currentIndex--;
                updateCarousel();
            });
    
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
                // FIXME: исправить баг перелистывания при простом тапе по элементу
                if (Math.abs(startX - endX) > 50) {
                    if (startX > endX + 50) {
                        if (currentIndex < carouselItems.length - 1) currentIndex++;
                    } else if (startX < endX - 50) {
                        if (currentIndex > 0) currentIndex--;
                    }
                    updateCarousel();
                }
            });    
            updateCarousel();
        });
    });
}

resetDefaultBehaviorForLinks();
setMenuFunctionality();
setCarouselFunctionality();
