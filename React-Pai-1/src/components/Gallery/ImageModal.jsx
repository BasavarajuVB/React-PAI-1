import { useState } from 'react';
import { updateImage } from '../../firebase/database';
import './ImageModal.css';

const ImageModal = ({ image, onClose, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: image.title,
    tags: Array.isArray(image.tags) ? image.tags.join(', ') : image.tags || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    
    const updatedImage = {
      ...image,
      title: editData.title,
      tags: editData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    const result = await updateImage(image.id, updatedImage);
    
    if (result.success) {
      setIsEditing(false);
      onEdit(updatedImage);
    } else {
      alert('Failed to update image: ' + result.error);
    }
    
    setLoading(false);
  };

  const handleDelete = () => {
    onDelete(image.id);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-image">
          <img src={image.src} alt={image.alt} />
        </div>
        
        <div className="modal-details">
          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Tags (comma-separated):</label>
                <input
                  type="text"
                  value={editData.tags}
                  onChange={(e) => setEditData({...editData, tags: e.target.value})}
                />
              </div>
              <div className="edit-actions">
                <button onClick={handleSave} disabled={loading} className="save-button">
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button onClick={() => setIsEditing(false)} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="image-info">
              <h2>{image.title}</h2>
              <div className="tags">
                {image.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <div className="modal-actions">
                <button onClick={() => setIsEditing(true)} className="edit-button">
                  Edit
                </button>
                <button onClick={handleDelete} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
