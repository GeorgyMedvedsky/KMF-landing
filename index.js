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

function setsliderFunctionality() {
    document.addEventListener('DOMContentLoaded', () => {
        const classes = {
            SLIDER: 'slider',
            SLIDER_LIST: 'slider__list',
            SLIDER_ITEM: 'slider__item',
            SLIDER_CONTROLS: 'slider__controls',
            SLIDER_TABS: 'slider__tabs',
            SLIDER_TAB: 'slider__tab',
            SLIDER_TAB_ACTIVE: 'slider__tab_active',
            SLIDER_DOT: 'slider__dot',
            SLIDER_DOT_ACTIVE: 'slider__dot_active'
        };
        const sliders = document.querySelectorAll(`.${classes.SLIDER}`);
    
        sliders.forEach(slider => {
            const tabTemplate = document.querySelector('#tab-template').content;
            const sliderList = slider.querySelector(`.${classes.SLIDER_LIST}`);
            const sliderItems = Array.from(slider.querySelectorAll(`.${classes.SLIDER_ITEM}`));
            const sliderControls = slider.querySelector(`.${classes.SLIDER_CONTROLS}`);
            const tabList = sliderControls.querySelector(`.${classes.SLIDER_TABS}`);
            const prevBtn = sliderControls.querySelector('.prev');
            const nextBtn = sliderControls.querySelector('.next');
            let startX, startY, endX, endY;
            let currentIndex = 0;

            createTabs(sliderItems.length);

            const tabs = Array.from(tabList.querySelectorAll(`.${classes.SLIDER_TAB}`));
            const dots = Array.from(tabList.querySelectorAll(`.${classes.SLIDER_DOT}`));
    
            function createTabs(length) {
                for(let i = 0; i < length; i++) {
                    const tab = tabTemplate.querySelector(`.${classes.SLIDER_TAB}`).cloneNode(true);
                    tabList.append(tab);
                }
            }

            function updateslider(gap = 16) {
                const offset = slider.id !== 'slider-for-heading'
                    ? -currentIndex * (sliderItems[0].clientWidth + gap)
                    : -currentIndex * (sliderList.offsetWidth * (100 / 100));
                sliderList.style.transform = `translateX(${offset}px)`;
                tabs.forEach(tab => tab.classList.remove(classes.SLIDER_TAB_ACTIVE));
                dots.forEach(dot => dot.classList.remove(classes.SLIDER_DOT_ACTIVE));
                tabs[currentIndex].classList.add(classes.SLIDER_TAB_ACTIVE);
                dots[currentIndex].classList.add(classes.SLIDER_DOT_ACTIVE);
            }

            nextBtn.addEventListener('click', () => {
                if (currentIndex < sliderItems.length - 1) currentIndex++;
                updateslider();
            });
    
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) currentIndex--;
                updateslider();
            });
    
            sliderList.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });
    
            sliderList.addEventListener('touchmove', (e) => {
                endX = e.touches[0].clientX;
                endY = e.touches[0].clientY;
    
                if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
                    e.preventDefault();
                }
            });
    
            sliderList.addEventListener('touchend', () => {
                // FIXME: исправить баг перелистывания при простом тапе по элементу
                if (Math.abs(startX - endX) > 50) {
                    if (startX > endX + 50) {
                        if (currentIndex < sliderItems.length - 1) currentIndex++;
                    } else if (startX < endX - 50) {
                        if (currentIndex > 0) currentIndex--;
                    }
                    updateslider();
                }
            });    
            updateslider();
        });
    });
}

resetDefaultBehaviorForLinks();
setMenuFunctionality();
setsliderFunctionality();
