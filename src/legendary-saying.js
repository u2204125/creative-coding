// stylistic-climb.js
const canvasSketch = require('canvas-sketch');

const settings = {
  // A4 Landscape at 300 DPI
  dimensions: [3508, 2480],
  pixelsPerInch: 300,
  animate: true, // Enable animation to allow re-rendering
  duration: 1,
  scaleToView: true,
};

// --- Tweak Panel Configuration ---
const params = {
  topBg: '#464E59',     // Slate Gray
  middleBg: '#212A3E',  // Deep Navy
  bottomBg: '#191919',  // Rich Charcoal
};

// --- Configuration ---
const colors = {
  paper: '#FFFFFF',
  get topBg() { return params.topBg; },
  get middleBg() { return params.middleBg; },
  get bottomBg() { return params.bottomBg; },
  textColor: '#FFFFFF',
  glowColor: 'rgba(255, 255, 255, 0.5)',
};

const fonts = {
  top: '400 125px "Inter", sans-serif',
  middle: 'italic bold 140px "Montserrat", sans-serif',
  bottom: '200px "Lobster", cursive',
};

const verses = {
  top: "Good players win the race,",
  middle: "Great ones break records,",
  bottom: "Legends change the game!!",
};

// --- Main Sketch ---
const sketch = ({ width, height }) => {
  // Define the white border size
  const margin = width * 0.05;
  const artWidth = width - margin * 2;
  const artHeight = height - margin * 2;

  return ({ context, width, height }) => {
    // --- 1. Paper Background & Art Area ---
    context.fillStyle = colors.paper;
    context.fillRect(0, 0, width, height);

    // Translate the origin to start drawing within the margin
    context.translate(margin, margin);

    // --- 2. Draw Angled Backgrounds (Inverted Angle) ---
    const y_skew_amplitude = artHeight * 0.3;

    // Top background
    context.fillStyle = colors.topBg;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(artWidth, 0);
    context.lineTo(artWidth, artHeight / 3 - y_skew_amplitude);
    context.lineTo(0, artHeight / 3 + y_skew_amplitude);
    context.closePath();
    context.fill();

    // Middle background
    context.fillStyle = colors.middleBg;
    context.beginPath();
    context.moveTo(0, artHeight / 3 + y_skew_amplitude);
    context.lineTo(artWidth, artHeight / 3 - y_skew_amplitude);
    context.lineTo(artWidth, (artHeight / 3) * 2 - y_skew_amplitude);
    context.lineTo(0, (artHeight / 3) * 2 + y_skew_amplitude);
    context.closePath();
    context.fill();

    // Bottom background
    context.fillStyle = colors.bottomBg;
    context.beginPath();
    context.moveTo(0, (artHeight / 3) * 2 + y_skew_amplitude);
    context.lineTo(artWidth, (artHeight / 3) * 2 - y_skew_amplitude);
    context.lineTo(artWidth, artHeight);
    context.lineTo(0, artHeight);
    context.closePath();
    context.fill();
    
    // --- 3. Draw Typography with Unique Styles ---
    context.fillStyle = colors.textColor;
    context.textBaseline = 'middle';
    
    // Top Verse (Clean, Spaced-out, Left-aligned)
    context.font = fonts.top;
    context.textAlign = 'left';
    context.letterSpacing = '15px';
    context.fillText(verses.top, artWidth * 0.05, (artHeight / 6) + 95);
    context.letterSpacing = '0px'; // Reset for others

    // Middle Verse (Centered, Italic "Montserrat")
    context.font = fonts.middle;
    context.textAlign = 'center';
    context.fillText(verses.middle, artWidth / 2, artHeight / 2);

    // Bottom Verse (Right Aligned, Script font with Glow)
    context.font = fonts.bottom;
    context.textAlign = 'right';
    // Apply glow effect
    context.shadowColor = colors.glowColor;
    context.shadowBlur = 30;
    context.fillText(verses.bottom, artWidth - (artWidth * 0.05), (artHeight / 6) * 5);
  };
};

canvasSketch(sketch, settings);

// --- Tweak Panel Setup ---
if (typeof window !== 'undefined') {
  const createPane = () => {
    // Create a simple HTML control panel
    const panel = document.createElement('div');
    panel.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0,0,0,0.8);
      color: white;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      z-index: 1000;
      min-width: 200px;
      transition: all 0.3s ease;
    `;
    
    panel.innerHTML = `
      <div id="panelHeader" style="
        padding: 15px 20px 10px 20px;
        cursor: pointer;
        border-bottom: 1px solid rgba(255,255,255,0.2);
        user-select: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <h3 style="margin: 0;">Background Colors</h3>
        <span id="toggleIcon" style="font-size: 16px;">▼</span>
      </div>
      <div id="panelContent" style="
        padding: 15px 20px 20px 20px;
        transition: all 0.3s ease;
        overflow: hidden;
      ">
        <div style="margin-bottom: 15px;">
          <label>Top Section:</label><br>
          <input type="color" id="topBg" value="${params.topBg}" style="width: 100%; margin-top: 5px;">
        </div>
        <div style="margin-bottom: 15px;">
          <label>Middle Section:</label><br>
          <input type="color" id="middleBg" value="${params.middleBg}" style="width: 100%; margin-top: 5px;">
        </div>
        <div style="margin-bottom: 15px;">
          <label>Bottom Section:</label><br>
          <input type="color" id="bottomBg" value="${params.bottomBg}" style="width: 100%; margin-top: 5px;">
        </div>
      </div>
    `;
    
    document.body.appendChild(panel);
    
    // Toggle functionality
    const header = document.getElementById('panelHeader');
    const content = document.getElementById('panelContent');
    const toggleIcon = document.getElementById('toggleIcon');
    let isExpanded = true;
    
    header.addEventListener('click', () => {
      isExpanded = !isExpanded;
      
      if (isExpanded) {
        content.style.height = 'auto';
        content.style.opacity = '1';
        content.style.padding = '15px 20px 20px 20px';
        toggleIcon.textContent = '▼';
      } else {
        content.style.height = '0';
        content.style.opacity = '0';
        content.style.padding = '0 20px';
        toggleIcon.textContent = '▶';
      }
    });
    
    // Add event listeners with immediate update
    const topInput = document.getElementById('topBg');
    const middleInput = document.getElementById('middleBg');
    const bottomInput = document.getElementById('bottomBg');
    
    topInput.addEventListener('input', (e) => {
      params.topBg = e.target.value;
    });
    
    middleInput.addEventListener('input', (e) => {
      params.middleBg = e.target.value;
    });
    
    bottomInput.addEventListener('input', (e) => {
      params.bottomBg = e.target.value;
    });
  };

  // Create pane when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createPane);
  } else {
    createPane();
  }
}