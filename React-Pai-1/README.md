# Dynamic & Responsive Photo Gallery

A modern, responsive photo gallery application built with React and Vite, featuring Firebase authentication and real-time database integration.

## Features

### 🔐 Authentication
- **Sign In/Sign Up**: Secure user authentication using Firebase Auth
- **Protected Routes**: Only authenticated users can access the gallery
- **Session Management**: Automatic login state persistence

### 🖼️ Photo Gallery
- **Responsive Grid Layout**: Adapts to different screen sizes (mobile, tablet, desktop)
- **Real-time Updates**: Photos sync automatically using Firebase Realtime Database
- **High-Quality Images**: Optimized image loading with lazy loading

### 🔍 Search & Filtering
- **Live Search**: Real-time search by title or tags with debouncing
- **Smart Filtering**: Instant results as you type
- **Clear Search**: Easy search reset functionality

### 📊 Sorting & Organization
- **Title Sorting**: Sort images alphabetically (A-Z or Z-A)
- **Persistent Preferences**: User preferences saved in localStorage
- **Dynamic Updates**: Sorting applies to search results

### ✏️ CRUD Operations
- **Add Images**: Upload new images with title, alt text, and tags
- **Edit Images**: Modify image details inline
- **Delete Images**: Remove images with confirmation
- **Real-time Sync**: All changes sync across devices instantly

### 🎨 Modern UI/UX
- **Beautiful Design**: Modern gradient backgrounds and smooth animations
- **Responsive Design**: Works perfectly on all device sizes
- **Interactive Elements**: Hover effects, smooth transitions, and loading states
- **Modal Views**: Detailed image view with full editing capabilities

### 💾 Data Persistence
- **Firebase Realtime Database**: All gallery data stored in the cloud
- **LocalStorage**: User preferences (sorting, search) persist between sessions
- **Sample Data**: Pre-loaded with beautiful nature images

## Technology Stack

- **Frontend**: React 19.1.1 with Vite
- **Authentication**: Firebase Auth
- **Database**: Firebase Realtime Database
- **Styling**: CSS3 with modern features (Grid, Flexbox, Animations)
- **Icons**: Emoji-based icons for simplicity

## Getting Started

### Prerequisites
- Node.js (v20.19.0 or higher)
- npm or yarn
- Firebase project with Realtime Database enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd React-PAI-1/React-Pai-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   - The Firebase configuration is already set up in `src/firebase/config.js`
   - Make sure your Firebase project has:
     - Authentication enabled (Email/Password)
     - Realtime Database enabled
     - Proper security rules configured

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Create an account or sign in
   - Start exploring the photo gallery!

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── SignIn.jsx          # Sign in component
│   │   ├── SignUp.jsx          # Sign up component
│   │   └── Auth.css            # Authentication styles
│   └── Gallery/
│       ├── PhotoGallery.jsx    # Main gallery component
│       ├── PhotoGrid.jsx       # Image grid layout
│       ├── SearchBar.jsx       # Search functionality
│       ├── SortDropdown.jsx    # Sorting controls
│       ├── ImageModal.jsx      # Image detail modal
│       ├── AddImageForm.jsx    # Add new image form
│       └── *.css               # Component-specific styles
├── firebase/
│   ├── config.js               # Firebase configuration
│   ├── auth.js                 # Authentication functions
│   └── database.js             # Database operations
├── App.jsx                     # Main application component
├── App.css                     # Global application styles
├── index.css                   # Base styles and resets
└── main.jsx                    # Application entry point
```

## Key Features Explained

### Firebase Integration
- **Real-time Database**: All image data is stored and synchronized in real-time
- **Authentication**: Secure user management with Firebase Auth
- **Sample Data**: Pre-populated with 19 beautiful nature images

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Flexible Grid**: CSS Grid adapts to different screen sizes
- **Touch-Friendly**: Large touch targets and smooth interactions

### Performance Optimizations
- **Lazy Loading**: Images load only when needed
- **Debounced Search**: Reduces API calls during typing
- **Efficient Re-renders**: Optimized React components

### User Experience
- **Intuitive Navigation**: Clear and simple interface
- **Visual Feedback**: Loading states and smooth animations
- **Error Handling**: User-friendly error messages
- **Accessibility**: Proper labels and keyboard navigation

## Customization

### Adding New Images
1. Click the "Add Image" button
2. Enter image URL, title, alt text, and tags
3. Click "Add Image" to save

### Editing Images
1. Click on any image to open the modal
2. Click "Edit" to modify details
3. Save changes to update the database

### Styling
- Modify CSS files in the `components/` directories
- Global styles can be updated in `App.css` and `index.css`
- Color scheme uses CSS custom properties for easy theming

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React, Vite, and Firebase**