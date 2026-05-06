// ========== スライドショー機能 ==========
let slideIndex = 1;
let slideTimer;

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        showSlides(slideIndex);
        startAutoSlide();
    }
    setupSmoothScroll();
    setupNavLinkTracking();
    setupMobileMenu();
});

// スライドを表示する関数
function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0 || dots.length === 0) {
        return;
    }

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

// 特定のスライドに移動
function currentSlide(n) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) {
        return;
    }
    clearTimeout(slideTimer);
    slideIndex = n;
    showSlides(slideIndex);
    startAutoSlide();
}

// 次/前のスライドに移動
function changeSlide(n) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) {
        return;
    }
    clearTimeout(slideTimer);
    slideIndex += n;
    showSlides(slideIndex);
    startAutoSlide();
}

// 自動スライド開始
function startAutoSlide() {
    slideTimer = setTimeout(function() {
        slideIndex++;
        showSlides(slideIndex);
        startAutoSlide();
    }, 5000); // 5秒ごとにスライドを変更
}

// ========== スムーズなスクロール機能 ==========
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========== ナビゲーションリンクのアクティブ状態管理 ==========
function setupNavLinkTracking() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    // スクロール時にアクティブなセクションを判定
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ========== モバイルメニュー機能 ==========
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // ハンバーガーアイコンのアニメーション
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                // クロスアイコンに変更
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                // 元に戻す
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // メニュー項目クリック時にメニューを閉じる
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                // ハンバーガーアイコンも元に戻す
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}
