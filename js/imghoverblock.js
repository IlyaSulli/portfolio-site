function initializeSlideshow(activeSlideshow, slides) {
    var slideIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, idx) => {
            if (idx === index) {
                slide.style.opacity = 1;
                slide.style.transform = 'scale(1)'; // Apply zoom-in effect to the active slide
            } else {
                slide.style.opacity = 0;
                slide.style.transform = 'scale(0.9)'; // Apply zoom-out effect to other slides
            }
        });
        slideIndex = index;
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }

    var interval; // Declare the interval variable here
    var isFirstSlide = true; // Flag to track the first slide

    activeSlideshow.addEventListener('mouseenter', function () {
        interval = setInterval(function () {
            nextSlide();
            if (isFirstSlide) {
                clearInterval(interval); // Clear the initial interval
                interval = setInterval(nextSlide, 1000); // Start with 1000ms interval
                isFirstSlide = false;
            }
        }, isFirstSlide ? 100 : 1000); // Set interval based on isFirstSlide
    });

    // Stop slideshow when the mouse leaves the activeSlideshow area
    activeSlideshow.addEventListener('mouseleave', function () {
        clearInterval(interval);
        slides.forEach((slide) => {
            slide.style.opacity = 0; // Hide all slides when stopping the slideshow
        });
        showSlide(0);
        isFirstSlide = true;
    });

    showSlide(slideIndex); // Show first slide initially
}

// Get all slideshow elements and initialize them
var slideshowElements = document.querySelectorAll('.portfolioImage');
slideshowElements.forEach((slideshowElement) => {
    var slides = slideshowElement.querySelectorAll('.portfolioSlides li');
    initializeSlideshow(slideshowElement, slides);
});
