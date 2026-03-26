// ================== LOADER ==================
window.addEventListener("load", function(){
    const loader = document.getElementById("loader");
    loader.style.display = "none";
});

// ================== MOBILE MENU ==================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    // For accessibility
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
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 20);
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
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    };

    const observer = new IntersectionObserver(lazyLoad, options);
    lazyImages.forEach(img => observer.observe(img));
});