import { useState, useEffect, useCallback } from 'react';
import { getImages, searchImages, deleteImage } from '../../firebase/database';
import { signOutUser } from '../../firebase/auth';
import PhotoGrid from './PhotoGrid';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import ImageModal from './ImageModal';
import AddImageForm from './AddImageForm';
import './PhotoGallery.css';

const PhotoGallery = ({ user, onSignOut }) => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Load user preferences from localStorage
  useEffect(() => {
    const savedSortOrder = localStorage.getItem('gallerySortOrder');
    const savedSearchTerm = localStorage.getItem('gallerySearchTerm');
    
    if (savedSortOrder) setSortOrder(savedSortOrder);
    if (savedSearchTerm) setSearchTerm(savedSearchTerm);
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('gallerySortOrder', sortOrder);
  }, [sortOrder]);

  useEffect(() => {
    localStorage.setItem('gallerySearchTerm', searchTerm);
  }, [searchTerm]);

  // Load images from Firebase
  useEffect(() => {
    const unsubscribe = getImages((snapshot) => {
      if (snapshot.exists()) {
        const imagesData = snapshot.val();
        const imagesArray = Object.entries(imagesData).map(([key, image]) => ({
          id: key,
          ...image
        }));
        setImages(imagesArray);
        setLoading(false);
      } else {
        setImages([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Search functionality with debouncing
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredImages(images);
      return;
    }

    const timeoutId = setTimeout(() => {
      const unsubscribe = searchImages(searchTerm, (snapshot) => {
        const searchResults = snapshot.val() || [];
        setFilteredImages(searchResults);
      });

      return () => unsubscribe();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, images]);

  // Sort images
  const sortedImages = useCallback(() => {
    return [...filteredImages].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filteredImages, sortOrder]);

  const handleSignOut = async () => {
    const result = await signOutUser();
    if (result.success) {
      onSignOut();
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      const result = await deleteImage(imageId);
      if (result.success) {
        // Close modal if it's open for the deleted image
        if (selectedImage && selectedImage.id === imageId) {
          setSelectedImage(null);
        }
      } else {
        alert('Failed to delete image: ' + result.error);
      }
    }
  };

  const handleEditImage = (image) => {
    setSelectedImage(image);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="gallery-container">
        <div className="loading">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <div className="header-content">
          <h1>Photo Gallery</h1>
          <div className="header-actions">
            <button 
              onClick={() => setShowAddForm(true)}
              className="add-button"
            >
              Add Image
            </button>
            <button 
              onClick={handleSignOut}
              className="signout-button"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        <div className="gallery-controls">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <SortDropdown 
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
        </div>
      </header>

      <main className="gallery-main">
        <PhotoGrid 
          images={sortedImages()}
          onImageClick={handleImageClick}
          onEditImage={handleEditImage}
          onDeleteImage={handleDeleteImage}
        />
        
        {sortedImages().length === 0 && (
          <div className="no-images">
            {searchTerm ? 'No images found matching your search.' : 'No images in gallery.'}
          </div>
        )}
      </main>

      {selectedImage && (
        <ImageModal 
          image={selectedImage}
          onClose={handleCloseModal}
          onEdit={handleEditImage}
          onDelete={handleDeleteImage}
        />
      )}

      {showAddForm && (
        <AddImageForm 
          onClose={() => setShowAddForm(false)}
          onSuccess={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default PhotoGallery;
