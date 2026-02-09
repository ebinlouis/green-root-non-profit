// Loader logic
document.body.style.overflow = 'hidden';
window.addEventListener('load', function () {
    setTimeout(function () {
        const loader = document.getElementById('loader-wrapper');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(function () {
                loader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }
    }, 1500); // 1.5 seconds loader
});

// Header Scroll Effect
const header = document.querySelector('.header');
if (header) {
    // Check initial scroll position
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}


// Back to Top Button Logic
document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
