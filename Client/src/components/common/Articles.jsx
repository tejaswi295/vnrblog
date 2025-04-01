import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useContext } from 'react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import './Articles.css'

function Articles() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const { currentUser } = useContext(userAuthorContextObj)

  //get all articles
  async function getArticles() {
    //get jwt token
    const token = await getToken()
    //make authenticated req
    let res = await axios.get('http://localhost:3000/author-api/articles', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.data.message === 'articles') {
      setArticles(res.data.payload)
      setError('')
    } else {
      setError(res.data.message)
    }
  }
  console.log(error)

  //goto specific article
  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj })
  }

  useEffect(() => {
    getArticles()
  }, [])

  console.log(articles)

  return (
    <div className="articles-container">
      {currentUser?.role === 'author' && (
        <div className="add-article-container">
          <button 
            className="add-article-button"
            onClick={() => navigate('../article')}
          >
            + Create New Article
          </button>
        </div>
      )}

      {error && <p className='error-message'>{error}</p>}
      
      <div className="articles-grid">
        {articles.map((articleObj) => (
          <div key={articleObj.articleId} className="article-card" onClick={() => gotoArticleById(articleObj)}>
            <div className="article-content">
              <h3 className="article-title">{articleObj.title}</h3>
              <span className="article-category">{articleObj.category}</span>
              <p className="article-preview">{articleObj.content}</p>
              <div className="article-footer">
                <button className="read-more-button">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Articles