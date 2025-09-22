// Gallery data will be loaded from artworks.json
let artworkData = [];

// DOM Elements
const gallery = document.getElementById('gallery');
const filtersContainer = document.getElementById('filters');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTags = document.getElementById('modal-tags');
const modalDownload = document.getElementById('modal-download');
const closeModalBtn = document.getElementById('modalCloseBtn');
let filterButtons = [];

// Initialize gallery
document.addEventListener('DOMContentLoaded', async function() {
    try {
        await loadArtworkData();
        createFilterButtons();
        renderGallery(artworkData);
        setupFilters();
        setupModal();
    } catch (error) {
        console.error('Failed to load artwork data:', error);
        showErrorMessage();
    }
});

// Load artwork data from JSON file
async function loadArtworkData() {
    try {
        const response = await fetch('./artworks.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        artworkData = await response.json();
    } catch (error) {
        console.error('Error loading artworks.json:', error);
        // Fallback to empty array if JSON fails to load
        artworkData = [];
        throw error;
    }
}

// Show error message if artwork data fails to load
function showErrorMessage() {
    gallery.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #64748b;">
            <h3>Gallery Coming Soon</h3>
            <p>Artwork data is being prepared. Please check back soon!</p>
            <p style="font-size: 0.9rem; margin-top: 1rem;">
                <em>Tip: Make sure artworks.json is properly configured with your artwork data.</em>
            </p>
        </div>
    `;
}

// Render gallery items
function renderGallery(artworks) {
    gallery.innerHTML = '';
    
    artworks.forEach(artwork => {
        const galleryItem = createGalleryItem(artwork);
        gallery.appendChild(galleryItem);
    });
}

// Create individual gallery item (Pexels style)
function createGalleryItem(artwork) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.category = artwork.category;
    item.dataset.id = artwork.id;
    
    const tagsHTML = artwork.tags.map((tag, index) => {
        const tagClass = index === 0 ? 'tag primary' : 'tag';
        return `<span class="${tagClass}">${tag}</span>`;
    }).join('');
    
    item.innerHTML = `
        <img src="${artwork.image}" alt="${artwork.title}">
        <div class="image-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
                <rect width="100%" height="100%" fill="#f9fafb"/>
                <text x="50%" y="50%" font-family="Inter" font-size="14" fill="#6b7280" text-anchor="middle" dy=".3em">Image Coming Soon</text>
            </svg>
        </div>
        <div class="gallery-item-overlay">
            <div class="overlay-content">
                <h3>${artwork.title}</h3>
                <p>${artwork.description.substring(0, 100)}...</p>
            </div>
        </div>
    `;
    
    // Get the image element and add load event
    const img = item.querySelector('img');
    img.onload = () => {
        item.classList.add('image-loaded');
    };
    
    // Add error handler
    img.onerror = () => {
        item.classList.remove('image-loaded');
    };
    
    // Trigger load check
    if (img.complete) {
        img.onload();
    }
    
    // Add click event to open modal
    item.addEventListener('click', () => openModal(artwork));
    
    return item;
}

// Create filter buttons dynamically based on artwork categories
function createFilterButtons() {
    // Get unique categories from artworks
    const categories = ['all'];
    artworkData.forEach(artwork => {
        if (!categories.includes(artwork.category)) {
            categories.push(artwork.category);
        }
    });
    
    // Create HTML for filter buttons
    filtersContainer.innerHTML = '';
    
    // Add "All Projects" button first
    const allButton = document.createElement('button');
    allButton.className = 'filter-btn active';
    allButton.dataset.filter = 'all';
    allButton.textContent = 'All Projects';
    filtersContainer.appendChild(allButton);
    
    // Add category-specific buttons
    categories.forEach(category => {
        if (category === 'all') return; // Skip 'all' as we already added it
        
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.dataset.filter = category;
        
        // Capitalize category name
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        button.textContent = categoryName;
        
        filtersContainer.appendChild(button);
    });
    
    // Update filterButtons array with new buttons
    filterButtons = document.querySelectorAll('.filter-btn');
}

// Setup filter functionality
function setupFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter gallery items
            const filter = button.dataset.filter;
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Setup modal functionality
function setupModal() {
    // Setup close button
    closeModalBtn.addEventListener('click', closeModalHandler);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModalHandler();
        }
    });
    
    // Add swipe support for mobile devices
    let touchstartX = 0;
    let touchendX = 0;
    
    modal.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });
    
    modal.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        if (touchendX - touchstartX > 100) {
            // Swiped right
            closeModalHandler();
        }
    });
}

// Open modal with artwork details
function openModal(artwork) {
    // Set image source
    modalImage.src = artwork.image;
    
    // Set title and description
    modalTitle.textContent = artwork.title;
    modalDescription.textContent = artwork.description;
    
    // Set dimensions and file
    document.getElementById('modal-dimensions').textContent = artwork.dimensions;
    document.getElementById('modal-file').textContent = artwork.file;
    
    // Render tags with different styles
    const tagsHTML = artwork.tags.map((tag, index) => {
        const tagClass = index === 0 ? 'tag primary' : index === 1 ? 'tag accent' : 'tag';
        return `<span class="${tagClass}">${tag}</span>`;
    }).join('');
    modalTags.innerHTML = tagsHTML;
    
    // Set download link and filename
    modalDownload.href = artwork.image;
    modalDownload.download = `${artwork.id}-wallpaper.png`;
    
    // Display the modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Auto-initiate download when clicking the download button
    modalDownload.addEventListener('click', (e) => {
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = artwork.image;
            link.download = `${artwork.id}-wallpaper.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 100);
    });
}

// Close modal with animation
function closeModalHandler() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.animation = 'modalFadeOut 0.2s ease-out';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Reset animation for next opening
        modalContent.style.animation = 'modalFadeIn 0.3s ease-out';
    }, 180);
}

// Utility function to add new artwork (for future use)
async function addArtwork(newArtwork) {
    artworkData.push(newArtwork);
    renderGallery(artworkData);
    // Note: This only adds to the current session
    // To permanently add artwork, update artworks.json file
}

// Utility function to reload artwork data
async function reloadArtworkData() {
    try {
        await loadArtworkData();
        renderGallery(artworkData);
        console.log('Artwork data reloaded successfully');
    } catch (error) {
        console.error('Failed to reload artwork data:', error);
    }
}

// Search functionality (can be added later)
function searchArtworks(query) {
    const filtered = artworkData.filter(artwork => 
        artwork.title.toLowerCase().includes(query.toLowerCase()) ||
        artwork.description.toLowerCase().includes(query.toLowerCase()) ||
        artwork.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    renderGallery(filtered);
}

// Export for potential future use
window.GalleryManager = {
    addArtwork,
    searchArtworks,
    reloadArtworkData,
    get artworkData() { return artworkData; }
};