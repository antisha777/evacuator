// =============================================
// ГЛАВНЫЙ ФАЙЛ JAVASCRIPT
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // 1. ПЛАВНЫЙ СКРОЛЛ И АКТИВНОЕ МЕНЮ
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
        }
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id], footer[id]');
        const navLinks = document.querySelectorAll('.header__nav-link');
        const footerNavLinks = document.querySelectorAll('.footer__nav-link');
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        let currentSection = '';
        const scrollPosition = window.scrollY + headerHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        footerNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            footerNavLinks.forEach(link => link.classList.remove('active'));
        }
    }
    
    // Навигация
    const headerLinks = document.querySelectorAll('.header__nav-link');
    headerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScroll(targetId);
        });
    });
    
    const footerLinks = document.querySelectorAll('.footer__nav-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScroll(targetId);
        });
    });
    
    // Кнопки
    const pricesLink = document.querySelector('.hero__prices-link');
    if (pricesLink) {
        pricesLink.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('prices');
        });
    }
    
    const priceButtons = document.querySelectorAll('.price-card__button');
    priceButtons.forEach(button => {
        button.addEventListener('click', function() {
            smoothScroll('contacts');
        });
    });
    
    const heroButton = document.querySelector('.hero__button');
    if (heroButton) {
        heroButton.addEventListener('click', function() {
            smoothScroll('contacts');
        });
    }
    
    // Логотипы
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
    
    const footerLogoLink = document.querySelector('.footer__logo-link');
    if (footerLogoLink) {
        footerLogoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // =============================================
    // 2. МОДАЛЬНОЕ ОКНО ЗАКАЗА ЗВОНКА
    // =============================================
    
    function initModal() {
        const modal = document.getElementById('callbackModal');
        const closeModal = document.getElementById('closeModal');
        const callbackForm = document.getElementById('callbackForm');
        const callButtons = document.querySelectorAll('.price-card__button, .hero__button');
        
        function openModal() {
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
        
        function closeModalFunc() {
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Открытие модалки
        callButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openModal();
            });
        });
        
        // Закрытие модалки
        if (closeModal) {
            closeModal.addEventListener('click', closeModalFunc);
        }
        
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal || e.target.classList.contains('modal__overlay')) {
                    closeModalFunc();
                }
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                closeModalFunc();
            }
        });
        
        // Отправка формы
        if (callbackForm) {
            callbackForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitButton = this.querySelector('button[type="submit"]');
                const buttonText = submitButton.querySelector('.button__text');
                const buttonLoader = submitButton.querySelector('.button__loader');
                
                // Показываем загрузку
                submitButton.disabled = true;
                buttonText.style.display = 'none';
                buttonLoader.style.display = 'inline-block';
                
                // Имитация отправки
                setTimeout(() => {
                    submitButton.disabled = false;
                    buttonText.style.display = 'inline-block';
                    buttonLoader.style.display = 'none';
                    
                    alert('Спасибо! Мы перезвоним вам в течение 5 минут!');
                    closeModalFunc();
                    callbackForm.reset();
                    
                    console.log('📞 Форма отправлена');
                }, 2000);
            });
        }
        
        // Маска для телефона
        const phoneInput = document.getElementById('userPhone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length === 0) {
                    e.target.value = '';
                } else if (value.length <= 1) {
                    e.target.value = '+7 (' + value;
                } else if (value.length <= 4) {
                    e.target.value = '+7 (' + value.substring(1, 4);
                } else if (value.length <= 7) {
                    e.target.value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7);
                } else if (value.length <= 9) {
                    e.target.value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9);
                } else {
                    e.target.value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
                }
            });
        }
    }
    
    // =============================================
    // 3. МОДАЛЬНЫЕ ОКНА ПОЛИТИК
    // =============================================
    
    function initPolicyModals() {
        const privacyModal = document.getElementById('privacyModal');
        const consentModal = document.getElementById('consentModal');
        
        // Функции открытия
        window.openPrivacyModal = function() {
            if (privacyModal) {
                privacyModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
        
        window.openConsentModal = function() {
            if (consentModal) {
                consentModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
        
        // Функции закрытия
        window.closePrivacyModal = function() {
            if (privacyModal) {
                privacyModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        window.closeConsentModal = function() {
            if (consentModal) {
                consentModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Обработчики ссылок
        const privacyLinks = document.querySelectorAll('a[href="#privacy"]');
        const consentLinks = document.querySelectorAll('a[href="#consent"]');
        
        privacyLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openPrivacyModal();
            });
        });
        
        consentLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openConsentModal();
            });
        });
        
        // Закрытие по ESC и оверлею
        [privacyModal, consentModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === modal || e.target.classList.contains('modal__overlay')) {
                        if (modal.id === 'privacyModal') closePrivacyModal();
                        if (modal.id === 'consentModal') closeConsentModal();
                    }
                });
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (privacyModal && privacyModal.classList.contains('active')) closePrivacyModal();
                if (consentModal && consentModal.classList.contains('active')) closeConsentModal();
            }
        });
    }
    
    // =============================================
    // 4. COOKIES BANNER
    // =============================================
    
    function initCookiesBanner() {
        const cookiesBanner = document.getElementById('cookiesBanner');
        const acceptCookiesButton = document.getElementById('acceptCookies');
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        
        if (!cookiesAccepted && cookiesBanner) {
            setTimeout(() => {
                cookiesBanner.classList.add('active');
            }, 1000);
        }
        
        if (acceptCookiesButton) {
            acceptCookiesButton.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', 'true');
                
                if (cookiesBanner) {
                    cookiesBanner.classList.remove('active');
                    setTimeout(() => {
                        cookiesBanner.style.display = 'none';
                    }, 300);
                }
                
                console.log('🍪 Cookies accepted');
            });
        }
        
        const cookiesLink = document.querySelector('.cookies-banner__link');
        if (cookiesLink) {
            cookiesLink.addEventListener('click', function(e) {
                e.preventDefault();
                smoothScroll('contacts');
            });
        }
    }
    
    // =============================================
    // 5. ИНИЦИАЛИЗАЦИЯ ВСЕХ ФУНКЦИЙ
    // =============================================
    
    // Запускаем все функции
    initModal();
    initPolicyModals();
    initCookiesBanner();
    
    // Запускаем активное меню
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
    
    console.log('🚗 Evacuator JS loaded successfully!');
});