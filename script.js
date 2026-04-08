// ================== LOADER ==================
window.addEventListener("load", function(){
    const loader = document.getElementById("loader");
    loader.style.opacity = "0"; // fade out
    setTimeout(() => loader.style.display = "none", 300); // remove after transition
});

// ================== MOBILE MENU ==================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", navLinks.classList.contains("show"));
});

// ================== COUNTERS ==================
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        let count = +counter.innerText;
        const increment = target / 200;

        if(count < target){
            count = Math.min(count + increment, target);
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCounter); // smoother than setTimeout
        } else {
            counter.innerText = target;
        }
    }
    updateCounter();
});

// ================== LAZY LOAD PORTFOLIO IMAGES ==================
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll("img.lazy");

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const img = entry.target;
                if(img.dataset.src){ // mobile fix: ensure data-src exists
                    img.src = img.dataset.src;
                    img.classList.remove("lazy");
                }
                observer.unobserve(img);
            }
        });
    };

    const observer = new IntersectionObserver(lazyLoad, options);
    lazyImages.forEach(img => observer.observe(img));
});
