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
            menuItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector(`.${classes.DROPDOWN_CONTENT}`).classList.remove(classes.DROPDOWN_CONTENT_OPEN);
                    otherItem.querySelector(`.${classes.MENU_TITLE}`).classList.remove('arrow-drop_open')
                }
            });
            this.classList.toggle('arrow-drop_open');
            dropdownContent.classList.toggle(classes.DROPDOWN_CONTENT_OPEN);
        });
    });
}

function setSliderFunctionality() {
    document.addEventListener('DOMContentLoaded', () => {
        const classes = {
            SLIDER: 'slider',
            LIST: 'slider__list',
            ITEM: 'slider__item',
            CONTROLS: 'slider__controls',
            TABS: 'slider__tabs',
            TAB: 'slider__tab',
            TAB_ACTIVE: 'slider__tab_active',
            DOT: 'slider__dot',
            DOT_ACTIVE: 'slider__dot_active'
        };
        const sliders = document.querySelectorAll(`.${classes.SLIDER}`);
        
        sliders.forEach(slider => {
            const tabTemplate = document.querySelector('#tab-template').content;
            const sliderList = slider.querySelector(`.${classes.LIST}`);
            const sliderItems = Array.from(slider.querySelectorAll(`.${classes.ITEM}`));
            const sliderControls = slider.querySelector(`.${classes.CONTROLS}`);
            const tabList = sliderControls.querySelector(`.${classes.TABS}`);
            const prevBtn = sliderControls.querySelector('.prev');
            const nextBtn = sliderControls.querySelector('.next');

            let startX, startY, endX, endY;
            let currentIndex = 0;
            let isHorizontalSwipe = false;

            createTabs(sliderItems.length);

            const tabs = Array.from(tabList.querySelectorAll(`.${classes.TAB}`));
            const dots = Array.from(tabList.querySelectorAll(`.${classes.DOT}`));
    
            function createTabs(length) {
                for(let i = 0; i < length; i++) {
                    const tab = tabTemplate.querySelector(`.${classes.TAB}`).cloneNode(true);
                    tabList.append(tab);
                }
            }

            function updateSlider(gap = 16) {
                const offset = slider.id !== 'slider-for-heading'
                    ? -currentIndex * (sliderItems[0].clientWidth + gap)
                    : -currentIndex * (sliderList.offsetWidth * (100 / 100));
                sliderList.style.transform = `translateX(${offset}px)`;
                tabs.forEach(tab => tab.classList.remove(classes.TAB_ACTIVE));
                dots.forEach(dot => dot.classList.remove(classes.DOT_ACTIVE));
                tabs[currentIndex].classList.add(classes.TAB_ACTIVE);
                dots[currentIndex].classList.add(classes.DOT_ACTIVE);
            }

            nextBtn.addEventListener('click', () => {
                if (currentIndex < sliderItems.length - 1) currentIndex++;
                updateSlider();
            });
    
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) currentIndex--;
                updateSlider();
            });

            sliderList.addEventListener('pointerdown', (e) => {
                startX = e.clientX;
                startY = e.clientY;
            }, {
                passive: true,
                touchAction: 'none'
            });
    
            sliderList.addEventListener('pointermove', (e) => {
                endX = e.clientX;
                endY = e.clientY;
    
                if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
                    isHorizontalSwipe = true;
                  } else {
                    isHorizontalSwipe = false;
                  }
            });
    
            sliderList.addEventListener('pointerup', () => {
                if (isHorizontalSwipe && Math.abs(startX - endX) > 80) {
                    if (startX > endX + 50) {
                        if (currentIndex < sliderItems.length - 1) currentIndex++;
                    } else if (startX < endX - 50) {
                        if (currentIndex > 0) currentIndex--;
                    }
                    updateSlider();
                }
                isHorizontalSwipe = false;
            }, { passive: true });

            updateSlider();
        });
    });
}

resetDefaultBehaviorForLinks();
setMenuFunctionality();
setSliderFunctionality();
