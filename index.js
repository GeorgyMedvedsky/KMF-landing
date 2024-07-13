//menu
const menuBtnClasses = {
    trigger: 'menu__button_type_trigger',
    close: 'menu__button_type_close'
};
const menuBtn = document.querySelector('.menu__button');
const menuList = document.querySelector('.menu__list');
const menuItems = menuList.querySelectorAll('.menu__list-item');

menuBtn.addEventListener('click', () => {
    if(menuBtn.classList.contains(menuBtnClasses.trigger)) {
        menuBtn.classList.add(menuBtnClasses.close);
        menuBtn.classList.remove(menuBtnClasses.trigger);
        menuList.classList.add('menu__list_open');
    } else {
        menuBtn.classList.add(menuBtnClasses.trigger);
        menuBtn.classList.remove(menuBtnClasses.close);
        menuList.classList.remove('menu__list_open');
    }
})

menuItems.forEach(item => {
    const title = item.querySelector('.menu__title');
    const dropdownContent = item.querySelector('.menu__dropdown-content');
    title.addEventListener('click', () => {
        if(!dropdownContent.classList.contains('menu__dropdown-content_open')) {
            dropdownContent.classList.add('menu__dropdown-content_open')
            title.classList.add('arrow-drop_open');
        } else {
            dropdownContent.classList.remove('menu__dropdown-content_open');
            title.classList.remove('arrow-drop_open');
        }
    });
});

