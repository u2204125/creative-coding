# Gallery Data Management

This file contains the artwork data for the gallery. To add new pieces to your gallery, simply add new entries to the `artworks.json` file.

## Adding New Artwork

Edit `artworks.json` and add a new object with the following structure:

```json
{
    "id": "unique-artwork-id",
    "title": "Artwork Title",
    "description": "Detailed description of the piece and techniques used.",
    "image": "../captures/your-image.png",
    "category": "binary|wallpaper|experimental",
    "tags": ["tag1", "tag2", "tag3"],
    "techniques": ["Technique 1", "Technique 2"],
    "dimensions": "WIDTHxHEIGHT",
    "file": "source-file.js"
}
```

## Field Descriptions

- **id**: Unique identifier for the artwork (lowercase, use hyphens)
- **title**: Display name of the artwork
- **description**: Detailed description shown in modal
- **image**: Path to the image file (relative to gallery folder)
- **category**: Used for filtering (binary, wallpaper, experimental)
- **tags**: Array of tags for categorization and search
- **techniques**: Array of techniques/methods used
- **dimensions**: Image dimensions in WIDTHxHEIGHT format
- **file**: Source code filename

## Categories

- **binary**: Art focused on binary/text patterns
- **wallpaper**: Desktop wallpaper designs
- **experimental**: Experimental or unique pieces

## Image Guidelines

- Place images in the `captures/` folder
- Use descriptive filenames
- Recommended formats: PNG, JPG
- Optimize file sizes for web viewing
- Include high-resolution versions for download

## Example Entry

```json
{
    "id": "my-awesome-art",
    "title": "Geometric Dreams",
    "description": "An exploration of mathematical beauty through geometric patterns and color theory.",
    "image": "../captures/geometric-dreams.png",
    "category": "experimental",
    "tags": ["geometric", "mathematical", "colorful"],
    "techniques": ["Algorithmic pattern generation", "Color interpolation"],
    "dimensions": "1920x1080",
    "file": "geometric-dreams.js"
}
```

After updating `artworks.json`, refresh your gallery page to see the changes!