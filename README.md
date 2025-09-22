# Wallpaper Arts - Creative Coding Playground 🎨

Welcome to my creative coding journey! This is my personal collection of canvas-sketch.js experiments where I explore digital art, generative design, and visual programming. I'm passionate about combining code with creativity to produce unique wallpapers and artistic compositions.

**Join the Creative Journey!** ✨  
I encourage fellow developers and artists to fork this repository, experiment with the code, and share your own creative interpretations. Let's build a community of creative coders together! Stay tuned as I'll be adding more diverse creative coding projects beyond wallpapers in the future.

## 🎯 What You'll Find Here

This repository showcases various creative coding experiments, currently focusing on digital wallpaper generation. Each project demonstrates different techniques in generative art, from binary patterns and glitch effects to geometric compositions and interactive color schemes.

## 🎨 Projects Included

### 1. Binary Hello World Poster (`binary-hello-world-poster.js`)
A high-contrast, monochrome typographic art poster featuring the binary code for "Hello, World!" arranged in flowing lines with digital glitch effects.

**Features:**
- Diagonal split composition (white/black sections)
- Dense binary coverage with glitch effects
- High-resolution vector-style output
- Vintage terminal styling

### 2. PC Wallpaper (`pc_wallpaper.js`)
A dynamic 4K wallpaper generator featuring binary dragon artwork with customizable backgrounds.

**Features:**
- 4K resolution (3840x2160)
- Binary bitmap dragon rendering
- Zigzag binary pattern backgrounds
- 3D tilted watermark effects
- Sharp diagonal composition

### 3. Legendary Saying (`legendary-saying.js`)
An artistic poster with angled backgrounds and customizable color schemes.

**Features:**
- Collapsible tweak panel for real-time color adjustments
- A4 landscape format at 300 DPI
- Three-section angled design
- Modern typography effects

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- canvas-sketch CLI (for running the creative coding projects)

### Quick Setup

1. **Clone this creative playground:**
```bash
git clone https://github.com/u2204125/creative-coding.git
cd creative-coding
```

2. **Install canvas-sketch globally using pnpm:**
```bash
npm install -g pnpm
pnpm install -g canvas-sketch-cli
```

3. **Install dependencies:**
```bash
pnpm install
```

> **Why pnpm?** We use pnpm instead of npm because it's faster, more efficient with disk space (uses symlinks), handles peer dependencies better, and has stricter dependency resolution that prevents version conflicts. Perfect for creative coding projects with multiple canvas-sketch dependencies!

### Running Any Project

The beauty of this setup is its simplicity - each `.js` file is a standalone creative coding experiment:

```bash
# Run any creative project interactively
canvas-sketch [filename].js

# Export high-quality renders
canvas-sketch [filename].js --output=exports/[name].png --export
```

**Examples:**
```bash
# Interactive mode (recommended for experimentation)
canvas-sketch src/pc_wallpaper.js
canvas-sketch src/legendary-saying.js

# Direct export mode
canvas-sketch src/pc_wallpaper.js --output=my-wallpaper.png --export
```

- **Output**: High-quality PNG/PDF export

## 🚀 Local Development

For local testing, you can use any static file server:
```bash
# Python (if you have it)
python3 -m http.server 8000

# Node.js alternative
npx serve .

# VS Code Live Server extension (recommended)
```

Then visit `http://localhost:8000/gallery/` to view your gallery locally.

## 📝 License

## 🎯 Creative Projects Overview

### Current Wallpaper Collection

#### `src/pc_wallpaper.js` - Dragon in the Machine  
My most complex piece featuring binary dragon artwork with dynamic backgrounds.
- **Technique**: Image-to-binary bitmap conversion, zigzag pattern generation
- **Style**: 4K wallpaper, sharp diagonal splits, 3D tilted effects
- **Special**: Interactive real-time rendering with asset loading

#### `src/legendary-saying.js` - Color Symphony
An experimental piece focusing on color theory and geometric composition.
- **Technique**: Angled background sections with mathematical precision
- **Style**: A4 print format, customizable color schemes
- **Interactive**: Live tweak panel for real-time color adjustments

### Future Creative Directions 🔮
This repository will expand to include:
- Particle system experiments
- Music visualization projects  
- Interactive web art installations
- Algorithm-driven pattern generators
- And whatever creative coding inspiration strikes next!

## 🖼️ Gallery

**[View Live Gallery →](https://u2204125.github.io/creative-coding/gallery/)**

Check out the best renders from each project in our interactive web gallery, or browse the `captures/` folder for static examples.

## ⚙️ Customization

### Binary Patterns
Adjust density, font size, and glitch effects in the bitmap functions.

### Color Schemes
Use the built-in tweak panels or modify the color configurations directly.

### Output Settings
Modify dimensions, DPI, and format in the settings object of each file.

## 🛠️ Technical Details

- **Engine**: canvas-sketch.js
- **Graphics**: HTML5 Canvas API
- **Fonts**: Monospace families (Courier New, Fira Mono)
- **Effects**: Mathematical transformations, noise functions
- **Output**: High-quality PNG/PDF export

## � Deployment

### GitHub Pages Setup
This repository is configured for easy GitHub Pages deployment:

1. **Push to GitHub**:
```bash
git add .
git commit -m "Add creative coding projects"
git push origin main
```

2. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Scroll to "Pages" section
   - Set Source to "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Save

3. **Access Your Gallery**:
   - Your gallery will be available at: `https://[username].github.io/creative-coding/gallery/`
   - GitHub Pages automatically serves the static files

### Local Development
For local testing, you can use any static file server:
```bash
# Python (if you have it)
python3 -m http.server 8000

# Node.js alternative
npx serve .

# VS Code Live Server extension (recommended)
```

## �📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Join the Creative Community

I'm always excited to see what others create with these experiments! Here's how you can get involved:

### For Fellow Creative Coders:
- **Fork & Experiment**: Take any project and make it your own
- **Share Your Creations**: Submit your variations via pull requests
- **Suggest Ideas**: Open issues with creative coding challenges or techniques you'd like to see

### For Artists & Designers:
- **Use the Outputs**: Generate wallpapers for your projects (all outputs are free to use)
- **Request Features**: Let me know what kind of art generators you'd find useful
- **Collaborate**: Reach out if you have interesting visual concepts to code

### Stay Connected:
- ⭐ **Star this repo** to follow my creative coding journey
- � **Watch** for updates as I add new experimental projects
- 🔄 **Check back regularly** - I'm constantly experimenting with new techniques!

*"The best way to learn creative coding is by doing, sharing, and inspiring each other."*

## 🐛 Issues & Ideas

Found a bug? Have a creative idea? Want to suggest a new type of generator? Please open an issue! I love collaborating and hearing fresh perspectives on creative coding.

---

**Happy Creative Coding! 🎨✨**  
*Built with passion using canvas-sketch.js*