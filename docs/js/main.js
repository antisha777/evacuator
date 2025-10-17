// =============================================
// ПЛАВНЫЙ СКРОЛЛ И АКТИВНОЕ МЕНЮ
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // 1. Функция плавного скролла
    // =============================================
    function smoothScroll(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            console.log('Элемент не найден:', targetId);
        }
    }
    
    // =============================================
    // 2. Функция подсветки активного пункта меню
    // =============================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id], footer[id]'); // включаем footer
        const navLinks = document.querySelectorAll('.header__nav-link');
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        let currentSection = '';
        const scrollPosition = window.scrollY + headerHeight + 50;
        
        // Находим текущую секцию
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Обновляем классы у ссылок
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        // Если вверху страницы - убираем все активные классы
        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
        }
    }
    
    // =============================================
    // 3. Обработчики событий для навигации
    // =============================================
    
    // Обработчик для всех ссылок в хедере
    const headerLinks = document.querySelectorAll('.header__nav-link');
    headerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // убираем #
            console.log('Клик по ссылке:', targetId); // для отладки
            smoothScroll(targetId);
        });
    });
    
    // Обработчик для кнопки "Цены" в hero
    const pricesLink = document.querySelector('.hero__prices-link');
    if (pricesLink) {
        pricesLink.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('prices');
        });
    }
    
    // Обработчик для кнопок "позвонить" в карточках цен
    const priceButtons = document.querySelectorAll('.price-card__button');
    priceButtons.forEach(button => {
        button.addEventListener('click', function() {
            smoothScroll('contacts');
        });
    });
    
    // Обработчик для логотипа (скролл наверх)
    const logoLink = document.querySelector('.header__logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Обработчик для кнопки "ЗАКАЗАТЬ ЭВАКУАЦИЮ"
    const heroButton = document.querySelector('.hero__button');
    if (heroButton) {
        heroButton.addEventListener('click', function() {
            smoothScroll('contacts');
        });
    }
    
    // =============================================
    // 4. Инициализация
    // =============================================
    
    // Запускаем при загрузке
    updateActiveNavLink();
    
    // Запускаем при скролле
    window.addEventListener('scroll', updateActiveNavLink);
    
    console.log('🚗 Evacuator JS loaded successfully!');
    console.log('Доступные якоря:', Array.from(document.querySelectorAll('section[id], footer[id]')).map(el => el.id));
});