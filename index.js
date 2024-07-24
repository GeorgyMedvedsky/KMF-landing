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
            const lastItemOfList = sliderItems[sliderItems.length - 1];
            
            let startX, startY, endX, endY = 0;
            let currentIndex = 0;
            let isHorizontalSwipe = false;
            let swipeDirection = '';

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
                // const sliderRect = slider.getBoundingClientRect();
                // const lastItemOfListRect = lastItemOfList.getBoundingClientRect();

                // if(lastItemOfListRect.right <= sliderRect.right) {
                // }
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
            });
    
            sliderList.addEventListener('pointermove', (e) => {
                endX = e.clientX;
                endY = e.clientY;
                
                if(startX < endX + 70) swipeDirection = 'right';
                else if(startX + 70 > endX) swipeDirection = 'left';
                
                isHorizontalSwipe = Math.abs(endX - startX) > Math.abs(endY - startY) && Math.abs(startX - endX) > 10;

                if(isHorizontalSwipe) sliderList.style.touchAction = 'pan-x';
                else sliderList.style.touchAction = 'pan-y';
            });
    
            window.addEventListener('pointerup', (e) => {
                const sliderRect = slider.getBoundingClientRect();
                const lastItemOfListRect = lastItemOfList.getBoundingClientRect();

                if (isHorizontalSwipe && Math.abs(startX - endX) > 70) {
                    if(lastItemOfListRect.right <= sliderRect.right) {
                        if (swipeDirection === 'left') return;
                        else if (swipeDirection = 'right') {
                            if (currentIndex > 0) currentIndex--;
                        }
                    } else {
                        if (swipeDirection === 'left') {
                            if (currentIndex < sliderItems.length - 1) currentIndex++;
                        } else if (swipeDirection = 'right') {
                            if (currentIndex > 0) currentIndex--;
                        }
                    }
                    updateSlider();
                }

                isHorizontalSwipe = false;
                swipeDirection = '';
                startX, startY, endX, endY = 0;
                sliderList.style.touchAction = 'pan-y';
            });

            updateSlider();
        });
    });
}

resetDefaultBehaviorForLinks();
setMenuFunctionality();
setSliderFunctionality();
