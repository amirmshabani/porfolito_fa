// اسکریپت اصلی رزومه
document.addEventListener('DOMContentLoaded', function() {
    // متغیرهای اصلی
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const heroSection = document.querySelector('.hero-section');

    // تابع چک کردن موقعیت اسکرول
    function checkScroll() {
        const scrollY = window.scrollY;

        // تغییر استایل ناوبری
        if (scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // هایلایت کردن لینک فعال
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // منوی همبرگر موبایل
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
        });

        // بستن منو هنگام کلیک روی لینک
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuToggle.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // بستن منو هنگام کلیک روی overlay
        navLinksContainer.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && e.target === this) {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // بستن منو هنگام تغییر سایز صفحه
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // اسکرول smooth برای لینک‌های ناوبری
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // انیمیشن fade-in هنگام اسکرول
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-category, .timeline-item, .education-card, .project-card, .info-item');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('fade-in-up');
            }
        });
    }

    // تایپ انیمیشن برای عنوان
    function typeWriter() {
        const title = document.querySelector('.title');
        const text = title.textContent;
        title.textContent = '';
        let i = 0;

        const timer = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 100);
    }

    // تابع تبدیل اعداد انگلیسی به فارسی
    function toPersianNumber(num) {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
    }

    // انیمیشن شمارنده برای آمارها
    function animateCounters() {
        const stats = document.querySelectorAll('.stat-number');

        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target')) || 0;
            const suffix = stat.getAttribute('data-suffix') || '';
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = toPersianNumber(target) + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = toPersianNumber(Math.floor(current)) + suffix;
                }
            }, 20);
        });
    }

    // عملکرد فرم تماس
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // جمع‌آوری داده‌های فرم
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // شبیه‌سازی ارسال فرم
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ارسال...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> پیام ارسال شد!';
                submitBtn.style.background = '#10b981';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 3000);
            }, 2000);
        });
    }

    // انیمیشن مهارت‌ها هنگام اسکرول
    function animateSkills() {
        const skillFills = document.querySelectorAll('.skill-fill');

        skillFills.forEach(fill => {
            const fillTop = fill.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (fillTop < windowHeight - 100) {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 500);
            }
        });
    }

    // تابع برای جلوگیری از انیمیشن‌های تکراری
    let skillsAnimated = false;
    let countersAnimated = false;

    function handleScrollAnimations() {
        const scrollY = window.scrollY;

        // انیمیشن مهارت‌ها (یک بار)
        if (!skillsAnimated && scrollY > 500) {
            animateSkills();
            skillsAnimated = true;
        }

        // انیمیشن شمارنده‌ها (یک بار)
        if (!countersAnimated && scrollY > 200) {
            animateCounters();
            countersAnimated = true;
        }
    }

    // اضافه کردن کلاس fade-in-up به عناصر
    function addFadeInClass() {
        const elements = document.querySelectorAll('.skill-category, .timeline-item, .education-card, .project-card, .info-item');
        elements.forEach(element => {
            element.classList.add('fade-in-up');
        });
    }

    // رویدادهای اسکرول و ریسایز
    window.addEventListener('scroll', () => {
        checkScroll();
        animateOnScroll();
        handleScrollAnimations();
    });

    window.addEventListener('resize', () => {
        checkScroll();
    });

    // شروع انیمیشن‌ها
    setTimeout(() => {
        typeWriter();
    }, 1000);

    // اضافه کردن کلاس‌های اولیه
    addFadeInClass();

    // چک کردن موقعیت اولیه
    checkScroll();

    // پارتیکل‌های پس‌زمینه (اختیاری)
    function createParticles() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: ${Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)'};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.1};
                animation: float ${Math.random() * 10 + 10}s linear infinite;
                pointer-events: none;
            `;
            heroSection.appendChild(particle);
        }
    }

    // اضافه کردن انیمیشن float به CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(120deg); }
            66% { transform: translateY(10px) rotate(240deg); }
            100% { transform: translateY(0px) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // ایجاد پارتیکل‌ها
    createParticles();

    // قابلیت دسترسی
    // اضافه کردن tabindex به عناصر تعاملی
    navLinks.forEach(link => {
        link.setAttribute('tabindex', '0');
    });

    // رویدادهای کیبورد
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // بستن منوهای باز (اگر وجود داشته باشد)
            const activeMenus = document.querySelectorAll('.menu-active');
            activeMenus.forEach(menu => menu.classList.remove('menu-active'));
        }
    });

    // Intersection Observer برای انیمیشن‌های بهتر
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // مشاهده عناصر برای انیمیشن
        document.querySelectorAll('.skill-category, .timeline-item, .education-card, .project-card, .info-item').forEach(el => {
            observer.observe(el);
        });
    }

    // جلوگیری از zoom هنگام فوکوس روی input در موبایل
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (window.innerWidth <= 768) {
                document.body.style.zoom = '1';
            }
        });

        input.addEventListener('blur', () => {
            document.body.style.zoom = '';
        });
    });

    console.log('رزومه با موفقیت بارگذاری شد! 🚀');
});
