// ========== GALLERY DATA - 12 PROFESSIONAL CARDS ==========
const galleryData = [
    // Nature Category (4 cards)
    { id: 1, title: "Misty Mountains", category: "nature", desc: "Serene morning fog over alpine peaks with golden sunrise", imageUrl: "https://picsum.photos/id/104/400/300" },
    { id: 2, title: "Forest Path", category: "nature", desc: "Walking through ancient woods with sunlight filtering", imageUrl: "https://picsum.photos/id/127/400/300" },
    { id: 3, title: "Waterfall Dreams", category: "nature", desc: "Cascading water in pristine forest paradise", imageUrl: "https://picsum.photos/id/29/400/300" },
    { id: 4, title: "Ocean Cliffs", category: "nature", desc: "Dramatic coastline with crashing waves", imageUrl: "https://picsum.photos/id/42/400/300" },
    
    // Urban Category (4 cards)
    { id: 5, title: "Neon City", category: "urban", desc: "City lights reflecting after rain downtown", imageUrl: "https://picsum.photos/id/15/400/300" },
    { id: 6, title: "Downtown Rush", category: "urban", desc: "Busy city street at golden sunset hour", imageUrl: "https://picsum.photos/id/96/400/300" },
    { id: 7, title: "Skyscrapers", category: "urban", desc: "Modern architecture reaching for the sky", imageUrl: "https://picsum.photos/id/22/400/300" },
    { id: 8, title: "Metropolitan Life", category: "urban", desc: "Urban jungle with endless possibilities", imageUrl: "https://picsum.photos/id/106/400/300" },
    
    // Portrait Category (4 cards)
    { id: 9, title: "Beautiful Portrait", category: "portrait", desc: "Natural light and genuine smile captured", imageUrl: "https://picsum.photos/id/26/400/300" },
    { id: 10, title: "Quiet Moment", category: "portrait", desc: "Peaceful reflection in soft morning light", imageUrl: "https://picsum.photos/id/64/400/300" },
    { id: 11, title: "Joyful Smile", category: "portrait", desc: "Authentic happiness and warm expression", imageUrl: "https://picsum.photos/id/169/400/300" },
    { id: 12, title: "Deep Thoughts", category: "portrait", desc: "Contemplative mood in natural setting", imageUrl: "https://picsum.photos/id/91/400/300" }
];

let currentFilter = "all";
let currentImages = [];
let currentLightboxIndex = 0;

// ========== SLIDER VARIABLES ==========
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let slideInterval;

// ========== DOM ELEMENTS ==========
const galleryGrid = document.getElementById("galleryGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.querySelector(".close-lightbox");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.querySelector(".nav-links");
const exploreBtn = document.getElementById("exploreBtn");

// ========== SLIDER FUNCTIONS ==========
function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    
    // Add active class to current slide and dot
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
}

function nextSlide() {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) {
        newIndex = 0;
    }
    showSlide(newIndex);
}

function prevSlide() {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) {
        newIndex = slides.length - 1;
    }
    showSlide(newIndex);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 5000); // Change image every 5 seconds
}

function stopSlider() {
    clearInterval(slideInterval);
}

// Dot click handlers
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        stopSlider();
        showSlide(index);
        startSlider();
    });
});

// ========== SCROLL TO SECTION FUNCTION ==========
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 70;
        const elementPosition = section.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: "smooth"
        });
    }
}

// ========== NAVIGATION LINK HANDLERS ==========
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        const sectionId = href.substring(1);
        
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        
        scrollToSection(sectionId);
        navLinks.classList.remove("show");
    });
});

// Explore button click
if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
        scrollToSection("explore");
    });
}

// ========== MOBILE MENU ==========
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

// ========== RENDER GALLERY ==========
function renderGallery() {
    const filtered = currentFilter === "all" 
        ? [...galleryData] 
        : galleryData.filter(item => item.category === currentFilter);
    
    currentImages = filtered;
    
    if (filtered.length === 0) {
        galleryGrid.innerHTML = "<p style='text-align:center; grid-column:1/-1; padding:3rem;'>No images found in this category</p>";
        return;
    }
    
    let html = "";
    filtered.forEach((item, index) => {
        let categoryIcon = "";
        if (item.category === "nature") categoryIcon = "🌿";
        else if (item.category === "urban") categoryIcon = "🏙️";
        else categoryIcon = "👤";
        
        html += `
            <div class="gallery-card" data-index="${index}">
                <img src="${item.imageUrl}" alt="${item.title}" loading="lazy">
                <div class="card-info">
                    <div class="card-category">${categoryIcon} ${item.category}</div>
                    <div class="card-title">${item.title}</div>
                    <div class="card-desc">${item.desc}</div>
                </div>
            </div>
        `;
    });
    
    galleryGrid.innerHTML = html;
    
    document.querySelectorAll(".gallery-card").forEach(card => {
        card.addEventListener("click", () => {
            const index = parseInt(card.getAttribute("data-index"));
            openLightbox(index);
        });
    });
}

// ========== FILTER BUTTONS ==========
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.getAttribute("data-filter");
        renderGallery();
    });
});

// ========== LIGHTBOX FUNCTIONS ==========
function openLightbox(index) {
    currentLightboxIndex = index;
    const img = currentImages[index];
    lightboxImg.src = img.imageUrl;
    lightboxCaption.textContent = `${img.title} — ${img.desc}`;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    stopSlider();
}

function closeLightboxFunc() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    startSlider();
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentImages.length;
    openLightbox(currentLightboxIndex);
}

function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentImages.length) % currentImages.length;
    openLightbox(currentLightboxIndex);
}

// Lightbox event listeners
if (closeLightbox) closeLightbox.addEventListener("click", closeLightboxFunc);
if (prevBtn) prevBtn.addEventListener("click", prevImage);
if (nextBtn) nextBtn.addEventListener("click", nextImage);
if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightboxFunc();
    });
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightboxFunc();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
});

// ========== COLLECTION CARDS ==========
document.querySelectorAll(".collection-card").forEach(card => {
    card.addEventListener("click", () => {
        const filter = card.getAttribute("data-filter");
        filterBtns.forEach(btn => {
            if (btn.getAttribute("data-filter") === filter) {
                btn.click();
            }
        });
        scrollToSection("explore");
    });
});

document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const card = btn.closest(".collection-card");
        const filter = card.getAttribute("data-filter");
        filterBtns.forEach(btn => {
            if (btn.getAttribute("data-filter") === filter) {
                btn.click();
            }
        });
        scrollToSection("explore");
    });
});

// ========== CONTACT FORM ==========
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("✅ Message sent successfully! We'll get back to you soon.");
        contactForm.reset();
    });
}

// ========== ACTIVE NAV LINK ON SCROLL ==========
window.addEventListener("scroll", () => {
    const sections = ["home", "explore", "collections", "contact"];
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;
            
            if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
                document.querySelectorAll(".nav-link").forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${section}`) {
                        link.classList.add("active");
                    }
                });
            }
        }
    });
});

// ========== INITIAL RENDER AND SLIDER START ==========
renderGallery();
startSlider();

// Welcome animation for hero text
window.addEventListener("load", () => {
    const heroText = document.querySelector(".hero h1");
    if (heroText) {
        heroText.style.opacity = "0";
        heroText.style.transform = "translateY(20px)";
        setTimeout(() => {
            heroText.style.transition = "all 0.6s ease";
            heroText.style.opacity = "1";
            heroText.style.transform = "translateY(0)";
        }, 100);
    }
    
    console.log("✅ Image Slider Active! 5 beautiful background images rotating every 5 seconds");
});