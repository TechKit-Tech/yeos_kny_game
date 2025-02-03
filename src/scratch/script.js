const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 200;

const prizes = ['$100 Gift Card', 'Free Coffee', 'Discount Coupon', 'Free Product', 'Try Again'];
let isScratched = false;
let prize = '';

// List of images to choose from
const images = [
    './asset/bg.jpg', // Replace with actual image URLs
    'https://withlocals-com-res.cloudinary.com/image/upload/w_286,h_286,c_fill,g_faces,q_auto,dpr_3.0,f_auto/657ebebb96d93ca77a5b697364ef7348',
    'https://withlocals-com-res.cloudinary.com/image/upload/w_286,h_286,c_fill,g_faces,q_auto,dpr_3.0,f_auto/657ebebb96d93ca77a5b697364ef7348',
    'https://withlocals-com-res.cloudinary.com/image/upload/w_286,h_286,c_fill,g_faces,q_auto,dpr_3.0,f_auto/657ebebb96d93ca77a5b697364ef7348'
];

// Function to get a random image from the list
const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
};

// Load the random image
const assetImage = new Image();
assetImage.src = './asset/bg.jpg'; // Randomly pick an image from the list

// Draw the images once they have loaded
assetImage.onload = () => {
    ctx.drawImage(assetImage, 0, 0, canvas.width, canvas.height);
    canvas.style.backgroundImage = `url(${getRandomImage()})`;
};

// Function to detect scratch action
const startScratching = (event) => {
    if (isScratched) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.clearRect(x - 20, y - 20, 40, 40);
    checkScratchProgress();
};

const checkScratchProgress = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let scratchedPixels = 0;

    // Count the number of transparent pixels
    for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) {
            scratchedPixels++;
        }
    }

    // If more than 70% of the surface is scratched, reveal the prize
    if (scratchedPixels / (pixels.length / 4) > 0.7) {
        isScratched = true;
        revealPrize(); // Automatically reveal prize when 70% scratched
    }
};

const revealPrize = () => {
    if (isScratched) {
        prize = prizes[Math.floor(Math.random() * prizes.length)];
        // Show the prize in the popup
        document.getElementById('prizeText').innerText = `You won: ${prize}`;
        // Show the popup
        document.getElementById('prizePopup').style.display = 'flex';
    }
};

// Add mouse events to detect scratching
canvas.addEventListener('mousemove', startScratching);
canvas.addEventListener('touchmove', startScratching, { passive: true });

// Function to restart the game
const restartGame = () => {
    // Reset the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load a new random image and redraw
    assetImage.src = './asset/bg.jpg'; // Randomly pick an image from the list
    assetImage.onload = () => {
        ctx.drawImage(assetImage, 0, 0, canvas.width, canvas.height);
        canvas.style.backgroundImage = `url(${getRandomImage()})`;
    };

    // Reset game state
    isScratched = false;
    document.getElementById('prizeText').innerText = ''; // Clear prize text
    document.getElementById('prizePopup').style.display = 'none'; // Hide popup
};

// Redraw the canvas and start fresh
document.getElementById('restartBtn').addEventListener('click', restartGame);
