import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithGoogleRedirect, 
  getGoogleRedirectResult, 
  sendEmailSignInLink, 
  completeEmailSignIn 
} from '../googleAuth';
import { isSignInWithEmailLink, getAuth } from 'firebase/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Check for Google redirect result
    const checkRedirectResult = async () => {
      try {
        setLoading(true);
        const result = await getGoogleRedirectResult();
        
        if (result.success && result.user) {
          setMessage('Google sign-in successful! Redirecting...');
          setTimeout(() => navigate('/dashboard'), 1500);
        }
      } catch (error) {
        setError(`Google sign-in error: ${error.errorMessage || error.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };
    
    checkRedirectResult();
    
    // Check if the URL contains an email sign-in link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Get the email from localStorage
      let emailFromStorage = window.localStorage.getItem('emailForSignIn');
      
      if (!emailFromStorage) {
        // If no email in storage, prompt the user
        emailFromStorage = window.prompt('Please provide your email for confirmation');
      }
      
      if (emailFromStorage) {
        setLoading(true);
        setMessage('Completing sign-in...');
        
        completeEmailSignIn(window.location.href, emailFromStorage)
          .then(({ user }) => {
            setMessage('Sign-in successful! Redirecting...');
            // Clear the URL to remove the sign-in link
            window.history.replaceState(null, '', window.location.pathname);
            // Redirect to dashboard or home page
            setTimeout(() => navigate('/dashboard'), 1500);
          })
          .catch((error) => {
            setError(`Error signing in: ${error.errorMessage || error.message || 'Unknown error'}`);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [auth, navigate]);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const result = await sendEmailSignInLink(email);
      setMessage(result.message);
    } catch (error) {
      setError(`Error: ${error.errorMessage || error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    setMessage('Redirecting to Google sign-in...');
    
    try {
      await signInWithGoogleRedirect();
      // The page will redirect to Google and then back
      // The result will be handled in the useEffect
    } catch (error) {
      setError(`Error: ${error.errorMessage || error.message || 'Unknown error'}`);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Let's get started!</h2>
        
        {message && <div className="message success">{message}</div>}
        {error && <div className="message error" data-component-name="Login">{error}</div>}
        
        <form onSubmit={handleEmailSignIn}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          
          <button 
            type="submit" 
            className="email-button"
            disabled={loading}
          >
            Sign in with Email
          </button>
        </form>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <button 
          onClick={handleGoogleSignIn} 
          className="google-button"
          disabled={loading}
        >
          <span className="google-icon">G</span>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
