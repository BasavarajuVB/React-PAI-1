import './PhotoGrid.css';

const PhotoGrid = ({ images, onImageClick, onEditImage, onDeleteImage }) => {
  return (
    <div className="photo-grid">
      {images.map((image) => (
        <div key={image.id} className="photo-item">
          <div className="photo-wrapper" onClick={() => onImageClick(image)}>
            <img 
              src={image.src} 
              alt={image.alt}
              loading="lazy"
            />
            <div className="photo-overlay">
              <div className="photo-info">
                <h3>{image.title}</h3>
                <div className="photo-tags">
                  {image.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="photo-actions">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEditImage(image);
              }}
              className="edit-button"
              title="Edit image"
            >
              ✏️
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDeleteImage(image.id);
              }}
              className="delete-button"
              title="Delete image"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
