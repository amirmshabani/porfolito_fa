// اسکریپت اصلی رزومه
document.addEventListener('DOMContentLoaded', function () {
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
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
        });

        // بستن منو هنگام کلیک روی لینک
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    mobileMenuToggle.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // بستن منو هنگام کلیک روی overlay
        navLinksContainer.addEventListener('click', function (e) {
            if (window.innerWidth <= 768 && e.target === this) {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // بستن منو هنگام تغییر سایز صفحه
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // اسکرول smooth برای لینک‌های ناوبری
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
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
        contactForm.addEventListener('submit', function (e) {
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


/* ============================================================
   3d-effects.js — موتور افکتهای سهبعدی
   بعد از script.js بارگذاری شود
   ============================================================ */
(function () {
    'use strict';

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    document.addEventListener('DOMContentLoaded', function () {

        /* ---------- ۱) تگکردن کارتها بهعنوان سهبعدی ---------- */
        const cards = Array.from(document.querySelectorAll(
            '.stat, .highlight-item, .skill-category, .timeline-item, .education-card, .project-card, .info-item'
        ));
        cards.forEach(c => c.classList.add('t3d-card'));

        /* ---------- ۲) ورود سهبعدی هنگام اسکرول (stagger شده) ---------- */
        const revealEls = Array.from(document.querySelectorAll(
            '.about-text, .about-highlights, .skill-category, .timeline-item, .education-card, .project-card, .info-item'
        ));
        revealEls.forEach(el => {
            el.classList.remove('fade-in-up'); // جلوگیری از تداخل با انیمیشن قبلی
            el.classList.add('t3d-reveal');
        });

        if (!('IntersectionObserver' in window) || prefersReduced) {
            revealEls.forEach(el => el.classList.add('is-visible'));
        } else {
            const io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    const siblings = Array.from(el.parentElement.children)
                        .filter(c => c.classList.contains('t3d-reveal'));
                    const idx = Math.max(0, siblings.indexOf(el));
                    setTimeout(() => el.classList.add('is-visible'), Math.min(idx, 5) * 90);
                    io.unobserve(el);
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            revealEls.forEach(el => io.observe(el));
        }

        if (prefersReduced) return; // بدون حرکت اضافه برای کاربران حساس به موشن

        /* ---------- ۳) افکت Tilt با موس + براقیت نور ---------- */
        if (!isTouch) {
            cards.forEach(function (card) {
                card.addEventListener('mousemove', function (e) {
                    const r = card.getBoundingClientRect();
                    const x = (e.clientX - r.left) / r.width - 0.5;
                    const y = (e.clientY - r.top) / r.height - 0.5;
                    card.style.setProperty('--ry', (x * 12).toFixed(2) + 'deg');
                    card.style.setProperty('--rx', (-y * 12).toFixed(2) + 'deg');
                    card.style.setProperty('--mx', ((x + 0.5) * 100).toFixed(1) + '%');
                    card.style.setProperty('--my', ((y + 0.5) * 100).toFixed(1) + '%');
                });
                card.addEventListener('mouseleave', function () {
                    card.style.setProperty('--rx', '0deg');
                    card.style.setProperty('--ry', '0deg');
                });
            });
        }

        /* ---------- ۴) پارالاکس موس در هیرو ---------- */
        const hero = document.querySelector('.hero-section');
        if (hero && !isTouch) {
            hero.addEventListener('mousemove', function (e) {
                const cx = (e.clientX / window.innerWidth) - 0.5;
                const cy = (e.clientY / window.innerHeight) - 0.5;
                document.documentElement.style.setProperty('--hx', cx.toFixed(3));
                document.documentElement.style.setProperty('--hy', cy.toFixed(3));
            });
            hero.addEventListener('mouseleave', function () {
                document.documentElement.style.setProperty('--hx', '0');
                document.documentElement.style.setProperty('--hy', '0');
            });
        }

        /* ---------- ۵) نوار پیشرفت اسکرول + پارالاکس پسزمینه ---------- */
        const progress = document.createElement('div');
        progress.className = 't3d-progress';
        document.body.appendChild(progress);

        const heroBg = document.querySelector('.hero-bg-pattern');
        let ticking = false;

        function onScroll() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                const y = window.scrollY;
                const max = document.documentElement.scrollHeight - window.innerHeight;
                progress.style.width = max > 0 ? ((y / max) * 100).toFixed(2) + '%' : '0%';
                if (heroBg && y < window.innerHeight * 1.5) {
                    heroBg.style.setProperty('--sy', y.toFixed(1));
                }
                ticking = false;
            });
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        /* ---------- ۶) پارتیکلهای عمقدار ---------- */
        document.querySelectorAll('.particle').forEach(function (p) {
            p.style.setProperty('--pz', (Math.random() * 160 + 20).toFixed(0) + 'px');
        });

        // بازنویسی keyframes فلوت با نسخه سهبعدی
        // (چون بعد از اسکریپت اصلی تزریق میشود، نسخه ما برنده است)
        const depthStyle = document.createElement('style');
        depthStyle.textContent = `
            @keyframes float {
                0%   { transform: translateZ(var(--pz, 40px)) translateY(0) rotate(0deg); }
                33%  { transform: translateZ(calc(var(--pz, 40px) * 1.7)) translateY(-25px) rotate(120deg); }
                66%  { transform: translateZ(calc(var(--pz, 40px) * 0.3)) translateY(12px) rotate(240deg); }
                100% { transform: translateZ(var(--pz, 40px)) translateY(0) rotate(360deg); }
            }
        `;
        document.head.appendChild(depthStyle);

        console.log('حالت سهبعدی فعال شد 🎮');
    });
})();


/* ============================================================
   projects-filter.js — دستهبندی سهبعدی نمونهکارها
   بعد از script.js و 3d-effects.js بارگذاری شود
   ============================================================ */
(function () {
    'use strict';

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ==========================================================
       ⚙️ CONFIG — دستهها و کلمات کلیدی شناسایی
       اگر پروژهای در دسته اشتباه قرار گرفت،
       یک کلمه از «تیتر یا لینک» همان پروژه را به آرایه keywords اضافه کن.
       ========================================================== */
    const CATEGORIES = [
        {
            id: 'all',
            label: 'همه',
            icon: 'fa-layer-group',
            keywords: null
        },
        {
            id: 'web',
            label: 'وبسایت',
            icon: 'fa-globe',
            keywords: ['کافه', 'رسو', 'rosso', 'بلا', 'bellamode', 'برنجستان', 'وردپرس', 'فروشگاه', 'رستوران', 'پینت', 'paint', 'سایت']
        },
        {
            id: 'app',
            label: 'اپلیکیشن و ابزار',
            icon: 'fa-wand-magic-sparkles',
            keywords: ['پسورد', 'password', 'فودلی', 'foodly', 'رمز', 'amir-model', 'مدل']
        },
        {
            id: 'bot',
            label: 'ربات تلگرام',
            icon: 'fa-robot',
            keywords: ['ربات', 'تلگرام', 'bot', 'miniapptel']
        },
        {
            id: 'lab',
            label: 'کار با AI',
            icon: 'fa-flask',
            keywords: ['v0', 'کلون', 'clone', 'تمرین' , 'quran']
        },
        {
            id: 'other',
            label: 'اپلیکیشن اندروید',
            icon: 'fa-box-open',
            keywords: []
        }
    ];
    /* ========================================================== */

    document.addEventListener('DOMContentLoaded', function () {

        const cards = Array.from(document.querySelectorAll('.project-card'));
        if (!cards.length) return;

        /* ---------- ۱) تشخیص دسته هر کارت (خودکار) ---------- */
        cards.forEach(function (card) {
            if (card.dataset.pfCat) return; // اگر دستی در HTML ست شده، احترام بگذار
            const text = (card.textContent + ' ' +
                Array.from(card.querySelectorAll('a[href]'))
                    .map(a => a.href).join(' ')).toLowerCase();

            let matched = 'other';
            for (const cat of CATEGORIES) {
                if (!cat.keywords) continue;
                if (cat.keywords.some(k => text.indexOf(k.toLowerCase()) !== -1)) {
                    matched = cat.id;
                    break;
                }
            }
            card.dataset.pfCat = matched;
        });

        /* ---------- ۲) پیدا کردن والد کارتها (گرید) ---------- */
        const grid = cards[0].parentElement;
        grid.style.perspective = '1000px';

        /* ---------- ۳) ساخت نوار دکمههای سهبعدی ---------- */
        const counts = { all: cards.length };
        CATEGORIES.forEach(c => {
            if (c.id !== 'all') {
                counts[c.id] = cards.filter(k => k.dataset.pfCat === c.id).length;
            }
        });

        const tabsEl = document.createElement('div');
        tabsEl.className = 'pf-tabs';
        tabsEl.setAttribute('role', 'toolbar');
        tabsEl.setAttribute('aria-label', 'دستهبندی نمونهکارها');

        // فقط دستههایی که کار دارن + همه
        const visibleCats = CATEGORIES.filter(c => c.id === 'all' || counts[c.id] > 0);

        visibleCats.forEach(function (cat) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'pf-tab' + (cat.id === 'all' ? ' active' : '');
            btn.dataset.pfId = cat.id;
            btn.setAttribute('aria-pressed', cat.id === 'all' ? 'true' : 'false');
            btn.innerHTML =
                '<i class="fas ' + cat.icon + '"></i>' +
                '<span>' + cat.label + '</span>' +
                '<span class="pf-tab-count">' + toPersian(counts[cat.id]) + '</span>';
            btn.addEventListener('click', function () { activate(cat.id); });
            tabsEl.appendChild(btn);
        });

        // درج نوار قبل از گرید
        grid.parentNode.insertBefore(tabsEl, grid);

        /* ---------- ۴) تبدیل اعداد فارسی ---------- */
        function toPersian(num) {
            return String(num).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);
        }

        /* ---------- ۵) منطق فیلتر با انیمیشن سهبعدی ---------- */
        let currentId = 'all';

        function activate(id) {
            if (id === currentId) return;
            currentId = id;

            // بهروزرسانی حالت دکمهها
            tabsEl.querySelectorAll('.pf-tab').forEach(function (t) {
                const on = t.dataset.pfId === id;
                t.classList.toggle('active', on);
                t.setAttribute('aria-pressed', on ? 'true' : 'false');
            });

            // فیلتر کارتها با ورود stagger شده
            let shownIndex = 0;
            cards.forEach(function (card) {
                const match = (id === 'all') || card.dataset.pfCat === id;
                card.classList.remove('pf-pop');
                card.style.animationDelay = '';
                card.classList.toggle('pf-hidden', !match);

                if (match && !prefersReduced) {
                    card.style.animationDelay = (Math.min(shownIndex, 8) * 80) + 'ms';
                    void card.offsetWidth; // ریاستارت انیمیشن
                    card.classList.add('pf-pop');
                }
                if (match) shownIndex++;
            });

            // در موبایل، دکمه فعال وسط صفحه بیاید
            if (window.innerWidth <= 768) {
                const activeBtn = tabsEl.querySelector('.pf-tab.active');
                if (activeBtn) {
                    activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
            }
        }

        /* ---------- ۶) ناوبری کیبورد با فلشها ---------- */
        tabsEl.addEventListener('keydown', function (e) {
            const tabs = Array.from(tabsEl.querySelectorAll('.pf-tab'));
            const idx = tabs.indexOf(document.activeElement);
            if (idx === -1) return;

            let next = -1;
            if (e.key === 'ArrowLeft') next = idx + 1;       // RTL: چپ = بعدی
            else if (e.key === 'ArrowRight') next = idx - 1;  // RTL: راست = قبلی
            if (next >= 0 && next < tabs.length) {
                e.preventDefault();
                tabs[next].focus();
                tabs[next].click();
            }
        });
    });
})();
