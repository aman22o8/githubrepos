// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = eachItem

  return (
    <li className="each_repo">
      <img src={avatarUrl} alt={name} className="repo_image" />
      <h1 className="repo_heading">{name}</h1>
      <div className="same_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars_icon"
        />
        <p className="headings">{`${starsCount} stars`}</p>
      </div>
      <div className="same_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars_icon"
        />
        <p className="headings">{`${forksCount} forks`}</p>
      </div>
      <div className="same_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stars_icon"
        />
        <p className="headings">{`${issuesCount} open issues`}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
