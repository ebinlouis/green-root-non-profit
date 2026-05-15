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
        const currentPath = window.location.pathname.split("/").pop();
        const isHomePage = currentPath === "" || currentPath === "index.html";

        if (!isHomePage) {
            // Force scrolled state and static background for inner pages, without giving them the scroll listener
            header.classList.add('scrolled');
            return;
        }

        // Check initial scroll position for home page
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
        fetch("components/navbar.html")
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

                // Add dark-nav class if NOT on index page
                if (currentPath !== "" && currentPath !== "index.html") {
                    const headerEl = document.querySelector(".header");
                    if (headerEl) {
                        headerEl.classList.add("dark-nav");
                    }
                }

                // Mobile Menu Toggle Logic
                const menuToggle = document.getElementById("menu-toggle");
                const header = document.querySelector(".header");

                if (menuToggle && header) {
                    menuToggle.addEventListener("click", () => {
                        header.classList.toggle("menu-active");
                        const icon = menuToggle.querySelector(".material-symbols-outlined");
                        if (header.classList.contains("menu-active")) {
                            icon.textContent = "close";
                            document.body.style.overflow = "hidden";
                        } else {
                            icon.textContent = "menu";
                            document.body.style.overflow = "auto";
                        }
                    });

                    // Close menu when clicking a link
                    const allLinks = document.querySelectorAll("#navbar-links a, .nav-actions a");
                    allLinks.forEach(link => {
                        link.addEventListener("click", () => {
                            header.classList.remove("menu-active");
                            const icon = menuToggle.querySelector(".material-symbols-outlined");
                            if (icon) icon.textContent = "menu";
                            document.body.style.overflow = "auto";
                        });
                    });
                }
            })
            .catch(error => console.error("Error loading navbar:", error));
    }

    // Load Footer Dynamically
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        fetch("components/footer.html")
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error("Error loading footer:", error));
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
