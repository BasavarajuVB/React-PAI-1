import { useState } from 'react';
import { addImage } from '../../firebase/database';
import './AddImageForm.css';

const AddImageForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    title: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.src || !formData.title) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const imageData = {
      src: formData.src,
      alt: formData.alt || formData.title,
      title: formData.title,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    const result = await addImage(imageData);
    
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="add-form-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <h2>Add New Image</h2>
        
        <form onSubmit={handleSubmit} className="add-image-form">
          <div className="form-group">
            <label htmlFor="src">Image URL *</label>
            <input
              type="url"
              id="src"
              name="src"
              value={formData.src}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter image title"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="alt">Alt Text</label>
            <input
              type="text"
              id="alt"
              name="alt"
              value={formData.alt}
              onChange={handleChange}
              placeholder="Enter alt text for accessibility"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags separated by commas"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-actions">
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Adding...' : 'Add Image'}
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddImageForm;
