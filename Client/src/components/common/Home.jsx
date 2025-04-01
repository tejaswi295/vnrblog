import { useContext, useEffect, useState } from 'react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Home.css';
import { ToastContainer } from 'react-toastify';

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj)

  const { isSignedIn, user, isLoaded } = useUser()
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // console.log("isSignedIn :", isSignedIn)
   console.log("User :", user)
  // console.log("isLolded :", isLoaded)



  async function onSelectRole(e) {
    //clear error property
    setError('')
    const selectedRole = e.target.value;
    currentUser.role = selectedRole;
    let res = null;
    try {
      if (selectedRole === 'author') {
        res = await axios.post('http://localhost:3000/author-api/author', currentUser)
        let { message, payload } = res.data;
        // console.log(message, payload)
        if (message === 'author') {
          setCurrentUser({ ...currentUser, ...payload })
          //save user to localstorage
          localStorage.setItem("currentuser",JSON.stringify(payload))
          // setError(null)
        } else {
          setError(message);
        }
      }
      if (selectedRole === 'user') {
        console.log(currentUser)
        res = await axios.post('http://localhost:3000/user-api/user', currentUser)
        let { message, payload } = res.data;
        console.log(message)
        if (message === 'user') {
          setCurrentUser({ ...currentUser, ...payload })
           //save user to localstorage
           localStorage.setItem("currentuser",JSON.stringify(payload))
        } else {
          setError(message);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  }


  useEffect(() => {
    if (isSignedIn === true) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded])



  useEffect(() => {

    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      console.log("first")
      navigate(`/author-profile/${currentUser.email}`);
    }
  }, [currentUser]);

  // console.log("cu",currentUser)
  //console.log("is loaded",isLoaded)

  const handleReadMore = () => {
    if (!isSignedIn) {
      toast.info('Please sign in or sign up to read more!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className='home-container'>
      <div className='animated-background'>
        <div className='gradient-overlay'></div>
      </div>
      
      {isSignedIn === false && (
        <div className='welcome-content'>
          <div className="hero-section">
            <h1 className="hero-title">Welcome to BlogVerse</h1>
            <p className="hero-subtitle">Your gateway to insightful stories, expert knowledge, and creative expressions</p>
          </div>

          <div className="featured-posts">
            <h2 className="section-title">Featured Stories</h2>
            <div className="posts-grid">
              <div className="post-card">
                <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643" 
                     alt="Technology Blog" 
                     className="post-image" />
                <div className="post-content">
                  <span className="post-category">Technology</span>
                  <h3>The Future of AI in Content Creation</h3>
                  <p>Artificial Intelligence is revolutionizing content creation across industries. From automated writing assistance to intelligent image generation, AI tools are empowering creators to produce more engaging content. Explore the latest trends in AI-driven content creation.</p>
                  <div className="card-footer">
                    <span className="read-time">8 min read</span>
                    <button className="read-more-btn" onClick={handleReadMore}>
                      Read More →
                    </button>
                  </div>
                </div>
              </div>

              <div className="post-card">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                     alt="Digital Transformation" 
                     className="post-image" />
                <div className="post-content">
                  <span className="post-category">Digital Innovation</span>
                  <h3>Web Development Trends 2024</h3>
                  <p>Stay ahead of the curve with the latest web development trends. From serverless architecture to AI-powered tools, discover how modern technologies are transforming web applications. Learn about practical implementation strategies.</p>
                  <div className="card-footer">
                    <span className="read-time">6 min read</span>
                    <button className="read-more-btn" onClick={handleReadMore}>
                      Read More →
                    </button>
                  </div>
                </div>
              </div>

              <div className="post-card">
                <img src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a" 
                     alt="Creative Writing" 
                     className="post-image" />
                <div className="post-content">
                  <span className="post-category">Creative Writing</span>
                  <h3>Mastering the Art of Storytelling</h3>
                  <p>Unlock the secrets of compelling storytelling that captivates readers. Learn essential techniques for narrative structure, character development, and emotional engagement. Perfect for both fiction and non-fiction writers.</p>
                  <div className="card-footer">
                    <span className="read-time">10 min read</span>
                    <button className="read-more-btn" onClick={handleReadMore}>
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="categories-section">
            <h2 className="section-title">Explore Categories</h2>
            <div className="categories-grid">
              <div className="category-card">
                <span className="category-icon">💻</span>
                <h3>Technology</h3>
                <p>Deep dives into programming, AI, and tech innovations that are shaping our future.</p>
              </div>
              <div className="category-card">
                <span className="category-icon">✍️</span>
                <h3>Creative Writing</h3>
                <p>Fiction, poetry, and narrative techniques to enhance your writing skills.</p>
              </div>
              <div className="category-card">
                <span className="category-icon">📱</span>
                <h3>Digital Life</h3>
                <p>Navigate the digital world with insights on productivity and online presence.</p>
              </div>
              <div className="category-card">
                <span className="category-icon">🎨</span>
                <h3>Art & Design</h3>
                <p>Explore visual storytelling, UI/UX design, and creative expression.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSignedIn === true && (
        <div className='user-content'>
          <div className='user-profile-card'>
            <img src={user.imageUrl} width="100px" className='user-avatar' alt="" />
            <p className="user-name">{user.firstName}</p>
            <p className="user-email">{user.emailAddresses[0].emailAddress}</p>
          </div>
          <div className='role-selection'>
            <p className="select-role-text">Select Your Role</p>
            {error.length !== 0 && (
              <p className="error-message">{error}</p>
            )}
            <div className='role-options'>
              <div className="role-option">
                <input type="radio" name="role" id="author" value="author" className="role-input" onChange={onSelectRole} />
                <label htmlFor="author" className="role-label">Author</label>
              </div>
              <div className="role-option">
                <input type="radio" name="role" id="user" value="user" className="role-input" onChange={onSelectRole} />
                <label htmlFor="user" className="role-label">User</label>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default Home