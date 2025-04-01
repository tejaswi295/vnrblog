import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.jpg";
import { useClerk, useUser } from '@clerk/clerk-react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import './Header.css';

const Header = () => {
  //const { userId } = useAuth();
  const { signOut } = useClerk();
  const { currentUser,setCurrentUser } = useContext(userAuthorContextObj);
 // console.log(currentUser);

 const navigate=useNavigate()
  // Add these lines
  const { isSignedIn, user, isLoaded } = useUser();
  const handleSignOut = async () => {
    console.log("signout called")
    try {
      await signOut();
      // Clear local storage after successful sign out
      setCurrentUser(null)
      localStorage.clear();
      navigate('/')
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <div className="header-wrapper">
      <nav className="header-nav">
        <div className="logo-container">
          <Link href="/">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
          <h1 className="site-title">BlogVerse</h1>
        </div>
        <ul className="nav-links">
          {!isSignedIn ? (
            <>
              <li>
                <Link to="signin" className="nav-link">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="signup" className="nav-link">
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <div className="user-section">
              <div className="user-profile">
                <div className="avatar-container">
                  <img
                    src={user.imageUrl}
                    className="user-avatar"
                    alt="User avatar"
                  />
                  <span className="role-badge">{currentUser.role}</span>
                </div>
                <p className="user-name">{user.firstName}</p>
              </div>
              <button onClick={handleSignOut} className="signout-button">
                Sign Out
              </button>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header