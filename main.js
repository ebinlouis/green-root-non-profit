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

// Header Scroll Effect - Re-initialized recursively
function initHeaderScroll() {
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
}
initHeaderScroll();

// Load Navbar Dynamically
document.addEventListener("DOMContentLoaded", () => {
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    if (navbarPlaceholder) {
        fetch("navbar.html")
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;

                // Highlight active link
                const currentPath = window.location.pathname.split("/").pop();
                const navLinks = document.querySelectorAll("#navbar-links a");
                navLinks.forEach(link => {
                    const href = link.getAttribute("href");
                    if (href === currentPath || (currentPath === "" && href === "index.html")) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });

                // Apply correct scroll styling
                initHeaderScroll();

                // Add dark-nav class if NOT on index page, to display dark text on white backgrounds
                if (currentPath !== "" && currentPath !== "index.html") {
                    const headerEl = document.querySelector(".header");
                    if (headerEl) {
                        headerEl.classList.add("dark-nav");
                    }
                }
            })
            .catch(error => console.error("Error loading navbar:", error));
    }
});


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
