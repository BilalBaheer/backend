// Authentication services for the NegotiateAI application
import { 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  sendSignInLinkToEmail, 
  isSignInWithEmailLink, 
  signInWithEmailLink 
} from "firebase/auth";
import { auth, actionCodeSettings } from "./firebase";

// Google OAuth configuration
export const googleConfig = {
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET
};

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Add scopes if needed
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

// Function to sign in with Google using popup
export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // This gives you a Google Access Token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info
    const user = result.user;
    return { user, token };
  } catch (error) {
    // Handle Errors here
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used
    const email = error.customData?.email;
    // The AuthCredential type that was used
    const credential = GoogleAuthProvider.credentialFromError(error);
    throw { errorCode, errorMessage, email, credential };
  }
};

// Function to sign in with Google using redirect (preferred method)
export const signInWithGoogleRedirect = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
    // The result will be processed in getGoogleRedirectResult
    return { success: true };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw { errorCode, errorMessage };
  }
};

// Function to get the result of the Google redirect sign-in
export const getGoogleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    
    if (result) {
      // This gives you a Google Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info
      const user = result.user;
      return { user, token, success: true };
    }
    
    return { success: false, user: null };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData?.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    throw { errorCode, errorMessage, email, credential };
  }
};

// Function to send a sign-in email link
export const sendEmailSignInLink = async (email) => {
  try {
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device
    window.localStorage.setItem('emailForSignIn', email);
    
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    return { success: true, message: `Sign-in link sent to ${email}` };
  } catch (error) {
    throw { errorCode: error.code, errorMessage: error.message };
  }
};

// Function to complete sign in with email link
export const completeEmailSignIn = async (url, email = null) => {
  try {
    // Verify if the URL contains a sign-in link
    if (isSignInWithEmailLink(auth, url)) {
      // Get the email if not provided
      let signInEmail = email;
      if (!signInEmail) {
        // Try to get email from localStorage
        signInEmail = window.localStorage.getItem('emailForSignIn');
      }
      
      // If we still don't have an email, prompt the user
      if (!signInEmail) {
        throw new Error('Please provide your email to complete sign-in');
      }
      
      // Sign in the user
      const result = await signInWithEmailLink(auth, signInEmail, url);
      
      // Clear email from storage
      window.localStorage.removeItem('emailForSignIn');
      
      // Return the signed-in user
      return { user: result.user };
    } else {
      throw new Error('Invalid sign-in link');
    }
  } catch (error) {
    throw { errorCode: error.code || 'unknown', errorMessage: error.message };
  }
};

// Function to sign out
export const signOut = () => auth.signOut();

// Export all authentication methods
export const authService = {
  signInWithGoogle: signInWithGoogleRedirect, // Use redirect as the default method
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  getGoogleRedirectResult,
  sendEmailSignInLink,
  completeEmailSignIn,
  signOut
};

// For backward compatibility
export const signInWithGoogle = signInWithGoogleRedirect;