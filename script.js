// ========== スライドショー機能 ==========
let slideIndex = 1;
let slideTimer;

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
    startAutoSlide();
    setupSmoothScroll();
    setupNavLinkTracking();
});

// スライドを表示する関数
function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

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
    clearTimeout(slideTimer);
    slideIndex = n;
    showSlides(slideIndex);
    startAutoSlide();
}

// 次/前のスライドに移動
function changeSlide(n) {
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

// ========== フォーム送信処理 ==========
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert(`ご送信ありがとうございます。\n\nお名前: ${name}\nメール: ${email}\n\nお問い合わせ内容を確認いたします。`);
                form.reset();
            } else {
                alert('すべてのフィールドを入力してください。');
            }
        });
    }
});
