// kali-wallpaper-v2.js
const canvasSketch = require('canvas-sketch');
const Random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [3840, 2160], // 16:9 4K resolution
  pixelsPerInch: 300,
  animate: false,
  duration: 1,
  scaleToView: true,
};

// --- Helper function to load images ---
const loadImages = async (urls) => {
  return Promise.all(urls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Could not load image at ${url}`));
      img.src = url;
    });
  }));
};

// --- Helper function for binary bitmap drawing ---
const drawBinaryBitmap = (context, image, options) => {
  const { x, y, width, height, density, opacity } = options;

  // Create an off-screen canvas to sample the image data
  const offscreenCanvas = document.createElement('canvas');
  const offscreenContext = offscreenCanvas.getContext('2d');
  offscreenCanvas.width = width;
  offscreenCanvas.height = height;
  offscreenContext.drawImage(image, 0, 0, width, height);
  const imageData = offscreenContext.getImageData(0, 0, width, height).data;

  // Setup for drawing text
  const fontSize = density * 1.8;
  context.font = `bold ${fontSize}px "Courier New", monospace`;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  
  context.save();
  context.globalAlpha = opacity;

  for (let row = 0; row < height; row += density) {
    for (let col = 0; col < width; col += density) {
      const i = (row * width + col) * 4;
      const red = imageData[i];
      const green = imageData[i + 1];
      const blue = imageData[i + 2];
      const alpha = imageData[i + 3];

      // Only draw on non-transparent AND non-white pixels (remove background)
      const brightness = (red + green + blue) / 3;
      if (alpha > 128 && brightness < 200) { // Exclude white/light background pixels
        const char = Random.pick(['0', '1']);
        const currentX = x + col;
        const currentY = y + row;

        // Determine the color based on the main background divider
        const dividerAtY = (context.canvas.width / 2) - (currentY - context.canvas.height / 2) * Math.tan(10 * Math.PI / 180);
        
        if (currentX > dividerAtY) {
          context.fillStyle = 'white'; // White text on black background
        } else {
          context.fillStyle = 'black'; // Black text on white background
        }
        context.fillText(char, currentX, currentY);
      }
    }
  }
  context.restore();
};

// --- Helper function to draw random binary strings in zigzag pattern ---
const drawRandomBinaryStrings = (context, bounds, options) => {
  const { fontSize, lineHeight, angle } = options;
  
  context.font = `${fontSize}px "Courier New", monospace`;
  context.textBaseline = 'middle';
  context.fillStyle = 'black'; // Black text for white background
  context.globalAlpha = 0.4; // Semi-transparent for background effect
  
  const angleRad = angle * Math.PI / 180;
  
  // Calculate proper spacing based on angled text height
  const angledLineSpacing = lineHeight / Math.cos(angleRad);
  const numLines = Math.floor((bounds.height - 100) / angledLineSpacing);
  
  for (let line = 0; line < numLines; line++) {
    // Create sharp zigzag pattern using modulo for direction changes
    // Change zigzag direction at random intervals
    const zigzagPeriod = Random.rangeFloor(5, 7);
    const isLeft = Math.floor(line / zigzagPeriod) % 2 === 0;
    
    // Sharp horizontal offset for zigzag (no smooth curves)
    const maxOffset = 60;
    const offsetDirection = isLeft ? -1 : 1;
    const lineInCycle = line % zigzagPeriod;
    const x = bounds.x - 20 + (offsetDirection * maxOffset * lineInCycle / (zigzagPeriod - 1));
    
    // Shorter string length to prevent overlapping
    const minLength = 15;
    const maxLength = 35;
    const stringLength = Math.floor(minLength + Math.random() * (maxLength - minLength));
    
    let binaryString = '';
    for (let char = 0; char < stringLength; char++) {
      binaryString += Random.pick(['0', '1']);
    }
    
    const y = bounds.y + line * angledLineSpacing;
    
    context.save();
    context.translate(x, y);
    context.rotate(angleRad);
    context.fillText(binaryString, 0, 0);
    context.restore();
  }
  
  context.globalAlpha = 1.0; // Reset alpha
};

// --- Helper function for 3D tilted binary bitmap drawing ---
const draw3DTiltedBinaryBitmap = (context, image, options) => {
  const { x, y, width, height, density, opacity, tiltAngle, skewX } = options;

  // Create an off-screen canvas to sample the image data
  const offscreenCanvas = document.createElement('canvas');
  const offscreenContext = offscreenCanvas.getContext('2d');
  offscreenCanvas.width = width;
  offscreenCanvas.height = height;
  offscreenContext.drawImage(image, 0, 0, width, height);
  const imageData = offscreenContext.getImageData(0, 0, width, height).data;

  // Setup for drawing text
  const fontSize = density * 1.8;
  context.font = `bold ${fontSize}px "Courier New", monospace`;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  
  context.save();
  context.globalAlpha = opacity;

  for (let row = 0; row < height; row += density) {
    for (let col = 0; col < width; col += density) {
      const i = (row * width + col) * 4;
      const red = imageData[i];
      const green = imageData[i + 1];
      const blue = imageData[i + 2];
      const alpha = imageData[i + 3];

      // Only draw on non-transparent AND non-white pixels
      const brightness = (red + green + blue) / 3;
      if (alpha > 128 && brightness < 200) {
        const char = Random.pick(['0', '1']);
        
        // Apply 3D transformation
        const normalizedRow = row / height;
        const tiltOffset = normalizedRow * skewX;
        const currentX = x + col + tiltOffset;
        const currentY = y + row;

        context.save();
        context.translate(currentX, currentY);
        context.rotate(tiltAngle * Math.PI / 180);
        context.scale(1, 0.8); // Slight vertical compression for 3D effect
        context.fillStyle = 'white';
        
        context.fillText(char, 0, 0);
        context.restore();
      }
    }
  }
  context.restore();
};


const sketch = async ({ update }) => {
  // Load the dragon and watermark images
  const [dragonImg, watermarkImg] = await loadImages([
    './assets/images/dragon.png',
    './assets/images/watermark.png'
  ]);

  return ({ context, width, height }) => {
    // --- 1. Backgrounds ---
    const angle = 10 * Math.PI / 180;
    const dividerX = width / 2;
    const tanAngle = Math.tan(angle);
    
    // Left side (White)
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Right side (Black) - Rotated inverse (180deg)
    context.fillStyle = 'black';
    context.beginPath();
    context.moveTo(dividerX + (height / 2) * tanAngle, 0); // Flipped signs
    context.lineTo(dividerX - (height / 2) * tanAngle, height); // Flipped signs
    context.lineTo(width, height);
    context.lineTo(width, 0);
    context.closePath();
    context.fill();

    // --- 2. Fill white area with rotated zigzag binary strings ---
    const whiteBounds = {
      x: 0, // Start from leftmost edge (no gap)
      y: 40,
      width: dividerX,
      height: height - 240
    };
    
    drawRandomBinaryStrings(context, whiteBounds, {
      fontSize: 28,
      lineHeight: 25,
      angle: 25
    });

    // --- 3. Draw the Binary Dragon ---
    const dragonScale = 0.7;
    const dragonHeight = height * dragonScale;
    const dragonWidth = (dragonImg.width / dragonImg.height) * dragonHeight;
    drawBinaryBitmap(context, dragonImg, {
      x: (width - 200 - dragonWidth) / 2,
      y: (height - dragonHeight) / 2,
      width: Math.floor(dragonWidth),
      height: Math.floor(dragonHeight),
      density: 5,
      opacity: 1.0
    });

    // --- 4. Draw the 3D Tilted Binary Watermark ---
    const watermarkScale = 0.12;
    const watermarkWidth = width * watermarkScale;
    const watermarkHeight = (watermarkImg.height / watermarkImg.width) * watermarkWidth;
    const margin = width * 0.02;
    
    // 3D tilted bitmap watermark
    draw3DTiltedBinaryBitmap(context, watermarkImg, {
      x: width + 150 - watermarkWidth - margin,
      y: height - 20 - watermarkHeight - margin,
      width: Math.floor(watermarkWidth),
      height: Math.floor(watermarkHeight),
      density: 5, // Density for watermark
      opacity: 0.4, // Semi-transparent
      tiltAngle: -15, // Tilt angle for 3D effect
      skewX: -90 // Horizontal skew for 3D perspective
    });
  };
};

canvasSketch(sketch, settings);