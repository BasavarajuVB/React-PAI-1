import { useState, useEffect } from 'react';
import { onAuthStateChange } from './firebase/auth';
import { initializeDatabase } from './firebase/database';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import PhotoGallery from './components/Gallery/PhotoGallery';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    // Initialize database with sample data
    initializeDatabase();

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignInSuccess = (user) => {
    setUser(user);
  };

  const handleSignUpSuccess = (user) => {
    setUser(user);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Photo Gallery...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return showSignUp ? (
      <SignUp 
        onSignUpSuccess={handleSignUpSuccess}
        onSwitchToSignIn={() => setShowSignUp(false)}
      />
    ) : (
      <SignIn 
        onSignInSuccess={handleSignInSuccess}
        onSwitchToSignUp={() => setShowSignUp(true)}
      />
    );
  }

  return <PhotoGallery user={user} onSignOut={handleSignOut} />;
}

export default App;
