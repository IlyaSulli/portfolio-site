// Get all blur-up images
const blurUpImages = document.querySelectorAll('.blur-up');

// Loop through the images and add load event listeners
blurUpImages.forEach(image => {
    const lowQualitySrc = image.getAttribute('data-src');

    // Create a new image element for loading the low-quality image
    const lowQualityImage = new Image();
    lowQualityImage.src = lowQualitySrc;

    // When the low-quality image is loaded
    lowQualityImage.onload = () => {
        // Set the src attribute of the image to the low-quality image
        image.src = lowQualitySrc;
        image.classList.add('loaded'); // Add loaded class for fade-in transition

        // Create a new image element for loading the full-quality image
        const fullQualityImage = new Image();
        const fullQualitySrc = lowQualitySrc.replace('_low', ''); // Get full-quality source
        fullQualityImage.src = fullQualitySrc;

        // When the full-quality image is loaded
        fullQualityImage.onload = () => {
            // Replace the src attribute of the image with the full-quality image
            image.src = fullQualitySrc;
        };
    };
});
