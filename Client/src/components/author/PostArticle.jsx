import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import { useNavigate } from 'react-router-dom'
import './PostArticle.css'

function PostArticle() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { currentUser } = useContext(userAuthorContextObj)
  const navigate = useNavigate()

  const categories = [
    "Programming",
    "Web Development",
    "Mobile Development",
    "AI & ML",
    "Data Science",
    "DevOps",
    "Cloud Computing",
    "Cybersecurity",
    "Blockchain",
    "IoT",
    "UI/UX Design",
    "Database",
    "Software Architecture",
    "Testing & QA",
    "Game Development"
  ];

  async function postArticle(articleObj) {
    console.log(articleObj)

    //create article object as per article schema
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl
    }
    articleObj.authorData = authorData;

    //article id(timestapm)
    articleObj.articleId = Date.now();

    //add date of creation & date of modification
    let currentDate = new Date();
    articleObj.dateOfCreation = currentDate.getDate() + "-"
      + currentDate.getMonth() + "-"
      + currentDate.getFullYear() + " "
      + currentDate.toLocaleTimeString("en-US", { hour12: true })

    articleObj.dateOfModification = currentDate.getDate() + "-"
      + currentDate.getMonth() + "-"
      + currentDate.getFullYear() + " "
      + currentDate.toLocaleTimeString("en-US", { hour12: true })
    //add comments array
    articleObj.comments = [];
    //add article active state
    articleObj.isArticleActive = true;
    //console.log(articleObj)
    //make HTTP POST req to create new article in backend
    let res = await axios.post('http://localhost:3000/author-api/article', articleObj)
    if (res.status === 201) {
      //navigate to articles component
      navigate(`/author-profile/${currentUser.email}/articles`)
    } else {
      //set error
    }



  }

  return (
    <div className="post-article-container">
      <form className="article-form" onSubmit={handleSubmit(postArticle)}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-input"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="error-message">{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-input"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="error-message">{errors.category.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea
            className="form-input form-textarea"
            {...register("content", { required: "Content is required" })}
          ></textarea>
          {errors.content && <p className="error-message">{errors.content.message}</p>}
        </div>

        <button type="submit" className="submit-button">Post Article</button>
      </form>
    </div>
  )
}

export default PostArticle