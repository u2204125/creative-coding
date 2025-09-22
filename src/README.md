# Creative Coding Scripts

This folder contains all the main creative coding scripts for generating digital art and wallpapers.

## 🎨 Current Projects

### `pc_wallpaper.js`
**Dragon in the Machine** - A 4K wallpaper generator featuring binary dragon artwork
- Binary bitmap dragon rendering
- Zigzag binary pattern backgrounds  
- 3D tilted watermark effects
- Sharp diagonal composition

### `legendary-saying.js`
**Color Symphony** - An experimental piece focusing on color theory
- Angled background sections with mathematical precision
- Real-time color adjustment panel
- A4 print format output
- Interactive design elements

## 🚀 How to Run

From the project root directory:

```bash
# Interactive mode (recommended)
canvas-sketch src/[filename].js

# Export mode
canvas-sketch src/[filename].js --output=exports/[name].png --export
```

## 🛠️ Adding New Scripts

1. Create your new `.js` file in this `src/` folder
2. Use canvas-sketch framework for consistency
3. Add artwork data to `gallery/artworks.json`
4. Export your best renders to `captures/` folder

## 📝 Code Structure

Each script typically includes:
- Canvas-sketch settings (dimensions, format, etc.)
- Helper functions for effects and patterns
- Main sketch function with rendering logic
- Optional interactive panels for real-time tweaking

**Happy creative coding!** 🎨✨